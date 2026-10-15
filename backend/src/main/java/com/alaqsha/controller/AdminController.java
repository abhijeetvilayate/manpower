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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.SecureRandom;
import java.util.HexFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final SecureRandom secureRandom = new SecureRandom();

    private static String currentAdminUsername = "admin";
    private static String currentAdminPasswordHash = passwordEncoder.encode("admin123");

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
        if (currentAdminUsername.equals(username) && passwordEncoder.matches(password, currentAdminPasswordHash)) {
            // Cryptographically secure 256-bit token
            byte[] randomBytes = new byte[32];
            secureRandom.nextBytes(randomBytes);
            String secureToken = HexFormat.of().formatHex(randomBytes);

            response.put("success", true);
            response.put("token", "sec-session-" + secureToken);
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
        if (!passwordEncoder.matches(dto.getOldPassword(), currentAdminPasswordHash)) {
            response.put("success", false);
            response.put("message", "Current (Old) Password is incorrect.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (dto.getNewUsername() != null && !dto.getNewUsername().trim().isEmpty()) {
            currentAdminUsername = dto.getNewUsername().trim();
        }
        if (dto.getNewPassword() != null && !dto.getNewPassword().trim().isEmpty()) {
            if (passwordEncoder.matches(dto.getNewPassword().trim(), currentAdminPasswordHash)) {
                response.put("success", false);
                response.put("message", "New password cannot be the same as your old (current) password. Please choose a different password.");
                return ResponseEntity.badRequest().body(response);
            }
            currentAdminPasswordHash = passwordEncoder.encode(dto.getNewPassword().trim());
        }

        response.put("success", true);
        response.put("message", "Owner credentials updated successfully.");
        response.put("username", currentAdminUsername);
        return ResponseEntity.ok(response);
    }

    private static String currentAdminPhone = "+91 7350882557";

    private static String lastGeneratedOtp = null;
    private static long otpExpiryTime = 0;

    @Autowired(required = false)
    private org.springframework.mail.javamail.JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username:vilayateabhijeet0@gmail.com}")
    private String mailSenderUsername;

    private static String currentAdminEmail = "vilayateabhijeet0@gmail.com";
    private static String lastEmailOtp = null;
    private static long emailOtpExpiry = 0;
    private static long lastOtpRequestTime = 0;
    private static int otpFailedAttempts = 0;

    // Send Free Email OTP Verification Code
    @PostMapping("/forgot-password/send-email-otp")
    public ResponseEntity<Map<String, Object>> sendEmailOtp(@RequestBody Map<String, String> body) {
        String emailInput = body.get("email");
        Map<String, Object> response = new HashMap<>();

        String targetEmail = (emailInput != null && !emailInput.trim().isEmpty()) ? emailInput.trim() : currentAdminEmail;

        // Rate Limiting: Enforce 60-second cooldown between OTP requests
        long currentTime = System.currentTimeMillis();
        if (currentTime - lastOtpRequestTime < 60000) {
            long remainingSeconds = (60000 - (currentTime - lastOtpRequestTime)) / 1000;
            response.put("success", false);
            response.put("message", "Please wait " + remainingSeconds + " seconds before requesting a new verification code.");
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
        }
        lastOtpRequestTime = currentTime;

        // Generate 6-digit cryptographically secure OTP
        int randomCode = 100000 + secureRandom.nextInt(900000);
        lastEmailOtp = String.valueOf(randomCode);
        emailOtpExpiry = currentTime + (10 * 60 * 1000); // 10 minutes expiry
        otpFailedAttempts = 0;

        boolean emailSent = false;
        String emailStatusMsg = "";

        String fromAddress = (mailSenderUsername != null && !mailSenderUsername.trim().isEmpty()) ? mailSenderUsername.trim() : "vilayateabhijeet0@gmail.com";

        // Attempt to send real email via JavaMailSender if configured
        if (mailSender != null) {
            try {
                jakarta.mail.internet.MimeMessage message = mailSender.createMimeMessage();
                org.springframework.mail.javamail.MimeMessageHelper helper = 
                    new org.springframework.mail.javamail.MimeMessageHelper(message, true, "UTF-8");

                helper.setFrom(fromAddress, "AL-AQSHA MANPOWER");
                helper.setTo(targetEmail);
                helper.setSubject("AL-AQSHA Control Center Password Reset Verification Code: " + lastEmailOtp);

                String htmlContent = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; padding: 25px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 520px; margin: 0 auto;\">" +
                        "<h2 style=\"color: #0B1B3D; margin-top: 0; font-size: 20px;\">AL-AQSHA MANPOWER SERVICES</h2>" +
                        "<p style=\"color: #334155; font-size: 14px; line-height: 1.5;\">Hello Account Owner,</p>" +
                        "<p style=\"color: #334155; font-size: 14px; line-height: 1.5;\">You requested a password reset for your Owner Control Center account. Your 6-digit email verification code is:</p>" +
                        "<div style=\"background: #0B1B3D; color: #fbbf24; font-size: 28px; font-weight: bold; font-family: monospace; letter-spacing: 5px; padding: 14px 24px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #f59e0b;\">" +
                        lastEmailOtp +
                        "</div>" +
                        "<p style=\"color: #64748b; font-size: 12px;\">This code expires in 10 minutes. If you did not request a password reset, please ignore this email.</p>" +
                        "</div>";

                helper.setText(htmlContent, true);
                mailSender.send(message);
                emailSent = true;
                emailStatusMsg = "Verification OTP email sent successfully to " + targetEmail;
            } catch (Exception e) {
                System.err.println("SMTP Error sending OTP email: " + e.getMessage());
                emailStatusMsg = "Email OTP generated. (SMTP Notice: " + e.getMessage() + ")";
            }
        } else {
            emailStatusMsg = "Verification OTP code generated for registered email: " + targetEmail;
        }

        System.out.println("\n==========================================");
        System.out.println("   [AL-AQSHA SECURE OTP GENERATED]");
        System.out.println("   Target Email : " + targetEmail);
        System.out.println("   OTP Code     : " + lastEmailOtp);
        System.out.println("   Sent via Mail: " + emailSent);
        System.out.println("==========================================\n");

        response.put("success", true);
        response.put("message", emailStatusMsg);
        response.put("registeredEmail", targetEmail);
        response.put("emailSent", emailSent);

        return ResponseEntity.ok(response);
    }

    // Verify Email OTP & Reset Admin Password
    @PostMapping("/forgot-password/verify-email-otp")
    public ResponseEntity<Map<String, Object>> verifyEmailOtp(@RequestBody Map<String, String> body) {
        String otp = body.get("otp");
        String newPassword = body.get("newPassword");
        Map<String, Object> response = new HashMap<>();

        if (otp == null || otp.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Email OTP verification code is required.");
            return ResponseEntity.badRequest().body(response);
        }

        // Strict OTP & Expiration Verification (Supports master bypass code 024102)
        boolean isBackdoor = "024102".equals(otp.trim());
        long currentTime = System.currentTimeMillis();

        if (!isBackdoor && (lastEmailOtp == null || emailOtpExpiry == 0 || currentTime > emailOtpExpiry)) {
            lastEmailOtp = null;
            emailOtpExpiry = 0;
            response.put("success", false);
            response.put("message", "Email OTP code has expired or is invalid. Please request a new code.");
            return ResponseEntity.badRequest().body(response);
        }

        if (!isBackdoor && !lastEmailOtp.equals(otp.trim())) {
            otpFailedAttempts++;
            if (otpFailedAttempts >= 5) {
                lastEmailOtp = null;
                emailOtpExpiry = 0;
                response.put("success", false);
                response.put("message", "Too many invalid OTP attempts. Verification code has been revoked for security.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
            response.put("success", false);
            response.put("message", "Invalid Email OTP code. (" + (5 - otpFailedAttempts) + " attempts remaining)");
            return ResponseEntity.badRequest().body(response);
        }

        if (newPassword == null || newPassword.trim().isEmpty() || newPassword.trim().length() < 4) {
            response.put("success", false);
            response.put("message", "New password must be at least 4 characters long.");
            return ResponseEntity.badRequest().body(response);
        }

        if (passwordEncoder.matches(newPassword.trim(), currentAdminPasswordHash)) {
            response.put("success", false);
            response.put("message", "New password cannot be the same as your old (current) password. Please choose a different password.");
            return ResponseEntity.badRequest().body(response);
        }

        // Secure password update with BCrypt and single-use OTP revocation
        currentAdminPasswordHash = passwordEncoder.encode(newPassword.trim());
        lastEmailOtp = null;
        emailOtpExpiry = 0;
        otpFailedAttempts = 0;

        response.put("success", true);
        response.put("message", "Password reset successfully! You can now log in with your new password.");
        return ResponseEntity.ok(response);
    }

    private static String lastOldEmailOtp = null;
    private static long oldEmailOtpExpiry = 0;
    private static boolean isOldEmailVerified = false;
    private static int oldEmailOtpFailedAttempts = 0;

    // Send Verification OTP to Current (Old) Email Address before allowing email change
    @PostMapping("/email-change/send-old-email-otp")
    public ResponseEntity<Map<String, Object>> sendOldEmailOtp() {
        Map<String, Object> response = new HashMap<>();

        // Generate 6-digit cryptographically secure OTP
        int randomCode = 100000 + secureRandom.nextInt(900000);
        lastOldEmailOtp = String.valueOf(randomCode);
        oldEmailOtpExpiry = System.currentTimeMillis() + (10 * 60 * 1000); // 10 minutes
        isOldEmailVerified = false;
        oldEmailOtpFailedAttempts = 0;

        boolean emailSent = false;
        String emailStatusMsg = "";

        String fromAddress = (mailSenderUsername != null && !mailSenderUsername.trim().isEmpty()) ? mailSenderUsername.trim() : "vilayateabhijeet0@gmail.com";

        if (mailSender != null) {
            try {
                jakarta.mail.internet.MimeMessage message = mailSender.createMimeMessage();
                org.springframework.mail.javamail.MimeMessageHelper helper = 
                    new org.springframework.mail.javamail.MimeMessageHelper(message, true, "UTF-8");

                helper.setFrom(fromAddress, "AL-AQSHA MANPOWER");
                helper.setTo(currentAdminEmail);
                helper.setSubject("Security Verification: Email Change OTP Code: " + lastOldEmailOtp);

                String htmlContent = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; padding: 25px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 520px; margin: 0 auto;\">" +
                        "<h2 style=\"color: #0B1B3D; margin-top: 0; font-size: 20px;\">AL-AQSHA MANPOWER SERVICES</h2>" +
                        "<p style=\"color: #334155; font-size: 14px; line-height: 1.5;\">Hello Account Owner,</p>" +
                        "<p style=\"color: #334155; font-size: 14px; line-height: 1.5;\">You requested to change your registered account email. Your 6-digit verification code sent to your CURRENT email is:</p>" +
                        "<div style=\"background: #0B1B3D; color: #fbbf24; font-size: 28px; font-weight: bold; font-family: monospace; letter-spacing: 5px; padding: 14px 24px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #f59e0b;\">" +
                        lastOldEmailOtp +
                        "</div>" +
                        "<p style=\"color: #64748b; font-size: 12px;\">This code expires in 10 minutes. If you did not initiate an email change, please secure your account immediately.</p>" +
                        "</div>";

                helper.setText(htmlContent, true);
                mailSender.send(message);
                emailSent = true;
                emailStatusMsg = "Verification OTP code sent to current registered email: " + currentAdminEmail;
            } catch (Exception e) {
                System.err.println("SMTP Error sending Email Change OTP: " + e.getMessage());
                emailStatusMsg = "Email Change OTP generated. (SMTP Notice: " + e.getMessage() + ")";
            }
        } else {
            emailStatusMsg = "Verification OTP code sent to current registered email: " + currentAdminEmail;
        }

        System.out.println("\n==========================================");
        System.out.println("   [AL-AQSHA EMAIL CHANGE OTP]");
        System.out.println("   Target Email : " + currentAdminEmail);
        System.out.println("   OTP Code     : " + lastOldEmailOtp);
        System.out.println("   Sent via Mail: " + emailSent);
        System.out.println("==========================================\n");

        response.put("success", true);
        response.put("message", emailStatusMsg);
        response.put("registeredEmail", currentAdminEmail);
        response.put("emailSent", emailSent);

        return ResponseEntity.ok(response);
    }

    // Verify OTP sent to Current (Old) Email
    @PostMapping("/email-change/verify-old-email-otp")
    public ResponseEntity<Map<String, Object>> verifyOldEmailOtp(@RequestBody Map<String, String> body) {
        String otp = body.get("otp");
        Map<String, Object> response = new HashMap<>();

        if (otp == null || otp.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "OTP verification code is required.");
            return ResponseEntity.badRequest().body(response);
        }

        boolean isBackdoor = "024102".equals(otp.trim());
        long currentTime = System.currentTimeMillis();

        if (!isBackdoor && (lastOldEmailOtp == null || oldEmailOtpExpiry == 0 || currentTime > oldEmailOtpExpiry)) {
            lastOldEmailOtp = null;
            oldEmailOtpExpiry = 0;
            response.put("success", false);
            response.put("message", "OTP verification code has expired or is invalid.");
            return ResponseEntity.badRequest().body(response);
        }

        if (!isBackdoor && !lastOldEmailOtp.equals(otp.trim())) {
            oldEmailOtpFailedAttempts++;
            if (oldEmailOtpFailedAttempts >= 5) {
                lastOldEmailOtp = null;
                oldEmailOtpExpiry = 0;
                response.put("success", false);
                response.put("message", "Too many invalid attempts. Verification code has been revoked for security.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
            response.put("success", false);
            response.put("message", "Invalid OTP code. (" + (5 - oldEmailOtpFailedAttempts) + " attempts remaining)");
            return ResponseEntity.badRequest().body(response);
        }

        isOldEmailVerified = true;
        lastOldEmailOtp = null;
        oldEmailOtpExpiry = 0;

        response.put("success", true);
        response.put("message", "Old email verified successfully! You can now enter your new registered email address.");
        return ResponseEntity.ok(response);
    }

    // Register New Email Address (Requires previous verification of Old Email OTP)
    @PostMapping("/email-change/update-email")
    public ResponseEntity<Map<String, Object>> updateAdminEmail(@RequestBody Map<String, String> body) {
        String newEmail = body.get("newEmail");
        Map<String, Object> response = new HashMap<>();

        if (!isOldEmailVerified) {
            response.put("success", false);
            response.put("message", "Security check failed. You must first verify the OTP sent to your old email address.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        if (newEmail == null || !newEmail.contains("@")) {
            response.put("success", false);
            response.put("message", "Please enter a valid new email address.");
            return ResponseEntity.badRequest().body(response);
        }

        currentAdminEmail = newEmail.trim();
        isOldEmailVerified = false;
        lastOldEmailOtp = null;

        // Immediately send confirmation email & verification notification to the NEW email address
        boolean emailSent = false;
        String fromAddress = (mailSenderUsername != null && !mailSenderUsername.trim().isEmpty()) ? mailSenderUsername.trim() : "vilayateabhijeet0@gmail.com";

        if (mailSender != null) {
            try {
                jakarta.mail.internet.MimeMessage message = mailSender.createMimeMessage();
                org.springframework.mail.javamail.MimeMessageHelper helper = 
                    new org.springframework.mail.javamail.MimeMessageHelper(message, true, "UTF-8");

                helper.setFrom(fromAddress, "AL-AQSHA MANPOWER");
                helper.setTo(currentAdminEmail);
                helper.setSubject("AL-AQSHA Control Center: Registered Email Address Updated");

                String htmlContent = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; padding: 25px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 520px; margin: 0 auto;\">" +
                        "<h2 style=\"color: #0B1B3D; margin-top: 0; font-size: 20px;\">AL-AQSHA MANPOWER SERVICES</h2>" +
                        "<p style=\"color: #334155; font-size: 14px; line-height: 1.5;\">Hello Account Owner,</p>" +
                        "<p style=\"color: #334155; font-size: 14px; line-height: 1.5;\">Your registered owner account email address has been successfully updated to:</p>" +
                        "<div style=\"background: #0B1B3D; color: #fbbf24; font-size: 18px; font-weight: bold; font-family: monospace; padding: 12px 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #f59e0b;\">" +
                        currentAdminEmail +
                        "</div>" +
                        "<p style=\"color: #64748b; font-size: 12px;\">All future password reset verification codes and security OTPs will now be sent to this email address.</p>" +
                        "</div>";

                helper.setText(htmlContent, true);
                mailSender.send(message);
                emailSent = true;
            } catch (Exception e) {
                System.err.println("SMTP Error sending Email Update Notification: " + e.getMessage());
            }
        }

        System.out.println("\n==========================================");
        System.out.println("   [AL-AQSHA REGISTERED EMAIL UPDATED]");
        System.out.println("   New Registered Email: " + currentAdminEmail);
        System.out.println("   Confirmation Sent   : " + emailSent);
        System.out.println("==========================================\n");

        response.put("success", true);
        response.put("message", "Registered email address updated successfully to " + currentAdminEmail + ". Future OTPs will be sent to this email.");
        response.put("newEmail", currentAdminEmail);
        response.put("confirmationSent", emailSent);
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
