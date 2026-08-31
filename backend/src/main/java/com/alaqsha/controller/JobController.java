package com.alaqsha.controller;

import com.alaqsha.entity.JobApplication;
import com.alaqsha.entity.JobOpening;
import com.alaqsha.repository.JobApplicationRepository;
import com.alaqsha.repository.JobOpeningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class JobController {

    private final JobOpeningRepository jobOpeningRepository;
    private final JobApplicationRepository jobApplicationRepository;

    @Autowired
    public JobController(JobOpeningRepository jobOpeningRepository,
                         JobApplicationRepository jobApplicationRepository) {
        this.jobOpeningRepository = jobOpeningRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    // Public: GET active non-expired job openings
    @GetMapping("/jobs")
    public ResponseEntity<List<JobOpening>> getActiveJobs() {
        LocalDate today = LocalDate.now();
        // Delete expired jobs from database automatically
        try {
            jobOpeningRepository.deleteByDeadlineBefore(today);
        } catch (Exception ignored) {}
        
        return ResponseEntity.ok(jobOpeningRepository.findByDeadlineGreaterThanEqual(today));
    }

    // Owner: POST new job opening
    @PostMapping("/admin/jobs")
    public ResponseEntity<JobOpening> createJob(@RequestBody JobOpening job) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobOpeningRepository.save(job));
    }

    // Owner: DELETE job opening
    @DeleteMapping("/admin/jobs/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        jobOpeningRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Public: Apply for job with mandatory resume file upload
    @PostMapping("/jobs/{id}/apply")
    public ResponseEntity<JobApplication> applyForJob(
            @PathVariable String id,
            @RequestParam("fullName") String fullName,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam(value = "experience", required = false) String experience,
            @RequestParam(value = "message", required = false) String message,
            @RequestParam("resume") MultipartFile resumeFile) throws IOException {

        if (resumeFile == null || resumeFile.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        JobOpening job = jobOpeningRepository.findById(id).orElse(null);

        // Save resume file locally
        String fileName = System.currentTimeMillis() + "_" + resumeFile.getOriginalFilename();
        Path uploadDir = Paths.get("uploads/resumes");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        Files.copy(resumeFile.getInputStream(), uploadDir.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

        JobApplication app = new JobApplication();
        app.setJobId(id);
        app.setJobTitle(job != null ? job.getTitle() : "Position #" + id);
        app.setFullName(fullName);
        app.setEmail(email);
        app.setPhone(phone);
        app.setExperience(experience);
        app.setMessage(message);
        app.setResumeFileName(fileName);

        return ResponseEntity.status(HttpStatus.CREATED).body(jobApplicationRepository.save(app));
    }

    // Owner: View all job applications
    @GetMapping("/admin/applications")
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        return ResponseEntity.ok(jobApplicationRepository.findAll());
    }

    // Owner/Admin: Download candidate resume PDF file
    @GetMapping("/admin/resumes/download/{filename}")
    public ResponseEntity<Resource> downloadResume(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads/resumes").resolve(filename).normalize();
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }
            Resource resource = new UrlResource(filePath.toUri());
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
