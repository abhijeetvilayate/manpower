package com.alaqsha.controller;

import com.alaqsha.dto.AdminProfileDto;
import com.alaqsha.entity.ContactInfo;
import com.alaqsha.entity.Enquiry;
import com.alaqsha.entity.JobApplication;
import com.alaqsha.entity.ServiceItem;
import com.alaqsha.repository.ContactInfoRepository;
import com.alaqsha.repository.EnquiryRepository;
import com.alaqsha.repository.JobApplicationRepository;
import com.alaqsha.repository.ServiceRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static String currentAdminUsername = "admin";
    private static String currentAdminPassword = "admin123";

    private final EnquiryRepository enquiryRepository;
    private final ServiceRepository serviceRepository;
    private final ContactInfoRepository contactInfoRepository;
    private final JobApplicationRepository jobApplicationRepository;

    @Autowired
    public AdminController(EnquiryRepository enquiryRepository,
                           ServiceRepository serviceRepository,
                           ContactInfoRepository contactInfoRepository,
                           JobApplicationRepository jobApplicationRepository) {
        this.enquiryRepository = enquiryRepository;
        this.serviceRepository = serviceRepository;
        this.contactInfoRepository = contactInfoRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Map<String, Object> response = new HashMap<>();
        if (currentAdminUsername.equals(username) && currentAdminPassword.equals(password)) {
            response.put("success", true);
            response.put("token", "admin-session-token-" + System.currentTimeMillis());
            response.put("role", "OWNER");
            response.put("username", currentAdminUsername);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Change Admin Credentials verifying Old Password
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody AdminProfileDto dto) {
        Map<String, Object> response = new HashMap<>();
        if (!currentAdminPassword.equals(dto.getOldPassword())) {
            response.put("success", false);
            response.put("message", "Current (Old) Password is incorrect.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (dto.getNewUsername() != null && !dto.getNewUsername().trim().isEmpty()) {
            currentAdminUsername = dto.getNewUsername().trim();
        }
        if (dto.getNewPassword() != null && !dto.getNewPassword().trim().isEmpty()) {
            currentAdminPassword = dto.getNewPassword().trim();
        }

        response.put("success", true);
        response.put("message", "Owner credentials updated successfully.");
        response.put("username", currentAdminUsername);
        return ResponseEntity.ok(response);
    }

    // Company Logo Upload
    @PostMapping("/upload-logo")
    public ResponseEntity<Map<String, String>> uploadLogo(@RequestParam("logo") MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        String fileName = "company_logo_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path logoPath = uploadDir.resolve(fileName);
        Files.copy(file.getInputStream(), logoPath, StandardCopyOption.REPLACE_EXISTING);

        Map<String, String> res = new HashMap<>();
        res.put("logoUrl", "/uploads/" + fileName);
        return ResponseEntity.ok(res);
    }

    // Export Enquiries as Native Binary .xlsx Spreadsheet
    @GetMapping("/enquiries/export-xlsx")
    public ResponseEntity<byte[]> exportEnquiriesToXlsx() throws IOException {
        List<Enquiry> enquiries = enquiryRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Enquiries & Messages");

            // Header Style
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Create Header Row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"ID", "Source Type", "Customer Name", "Email", "Phone", "Target Service Category", "Message / Requirements", "Date Submitted"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowNum = 1;
            for (Enquiry eq : enquiries) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(eq.getId());
                row.createCell(1).setCellValue(eq.getSourceType() != null ? eq.getSourceType() : "ENQUIRY_FORM");
                row.createCell(2).setCellValue(eq.getFullName() != null ? eq.getFullName() : "");
                row.createCell(3).setCellValue(eq.getEmail() != null ? eq.getEmail() : "");
                row.createCell(4).setCellValue(eq.getPhone() != null ? eq.getPhone() : "");
                row.createCell(5).setCellValue(eq.getServiceRequired() != null ? eq.getServiceRequired() : "General");
                row.createCell(6).setCellValue(eq.getMessage() != null ? eq.getMessage() : "");
                row.createCell(7).setCellValue(eq.getCreatedAt() != null ? eq.getCreatedAt().toString() : "");
            }

            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            byte[] xlsxBytes = out.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "AlAqsha_Consumer_Enquiries_" + System.currentTimeMillis() + ".xlsx");

            return new ResponseEntity<>(xlsxBytes, headers, HttpStatus.OK);
        }
    }

    // Export Candidate Applications as Native Binary .xlsx Spreadsheet
    @GetMapping("/applications/export-xlsx")
    public ResponseEntity<byte[]> exportApplicationsToXlsx() throws IOException {
        List<JobApplication> apps = jobApplicationRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Applied Candidates");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            Row headerRow = sheet.createRow(0);
            String[] columns = {"Application ID", "Candidate Name", "Email", "Phone", "Applied Position", "Experience", "Cover Note / Remarks", "Resume File", "Application Date"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowNum = 1;
            for (JobApplication app : apps) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(app.getId());
                row.createCell(1).setCellValue(app.getFullName() != null ? app.getFullName() : "");
                row.createCell(2).setCellValue(app.getEmail() != null ? app.getEmail() : "");
                row.createCell(3).setCellValue(app.getPhone() != null ? app.getPhone() : "");
                row.createCell(4).setCellValue(app.getJobTitle() != null ? app.getJobTitle() : "");
                row.createCell(5).setCellValue(app.getExperience() != null ? app.getExperience() : "");
                row.createCell(6).setCellValue(app.getMessage() != null ? app.getMessage() : "");
                row.createCell(7).setCellValue(app.getResumeFileName() != null ? app.getResumeFileName() : "");
                row.createCell(8).setCellValue(app.getCreatedAt() != null ? app.getCreatedAt().toString() : "");
            }

            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            byte[] xlsxBytes = out.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "AlAqsha_Applied_Candidates_" + System.currentTimeMillis() + ".xlsx");

            return new ResponseEntity<>(xlsxBytes, headers, HttpStatus.OK);
        }
    }

    // Services CRUD
    @PostMapping("/services")
    public ResponseEntity<ServiceItem> createService(@RequestBody ServiceItem item) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceRepository.save(item));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ServiceItem> updateService(@PathVariable String id, @RequestBody ServiceItem item) {
        item.setId(id);
        return ResponseEntity.ok(serviceRepository.save(item));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable String id) {
        serviceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Contact Info Update
    @GetMapping("/contact-info")
    public ResponseEntity<ContactInfo> getContactInfo() {
        return ResponseEntity.ok(contactInfoRepository.findById("1").orElseGet(ContactInfo::new));
    }

    @PutMapping("/contact-info")
    public ResponseEntity<ContactInfo> updateContactInfo(@RequestBody ContactInfo info) {
        info.setId("1");
        return ResponseEntity.ok(contactInfoRepository.save(info));
    }
}
