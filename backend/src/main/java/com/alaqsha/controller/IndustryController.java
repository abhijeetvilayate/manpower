package com.alaqsha.controller;

import com.alaqsha.entity.Industry;
import com.alaqsha.repository.IndustryRepository;
import com.alaqsha.service.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class IndustryController {

    private final IndustryService industryService;
    private final IndustryRepository industryRepository;

    @Autowired
    public IndustryController(IndustryService industryService, IndustryRepository industryRepository) {
        this.industryService = industryService;
        this.industryRepository = industryRepository;
    }

    @GetMapping("/industries")
    public ResponseEntity<List<Industry>> getAllIndustries() {
        return ResponseEntity.ok(industryService.getAllActiveIndustries());
    }

    @GetMapping("/industries/{id}")
    public ResponseEntity<Industry> getIndustryById(@PathVariable String id) {
        Industry industry = industryService.getIndustryById(id);
        if (industry == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(industry);
    }

    // Owner Admin CRUD
    @PostMapping("/admin/industries")
    public ResponseEntity<Industry> createIndustry(@RequestBody Industry industry) {
        return ResponseEntity.status(HttpStatus.CREATED).body(industryRepository.save(industry));
    }

    @PutMapping("/admin/industries/{id}")
    public ResponseEntity<Industry> updateIndustry(@PathVariable String id, @RequestBody Industry industry) {
        industry.setId(id);
        return ResponseEntity.ok(industryRepository.save(industry));
    }

    @DeleteMapping("/admin/industries/{id}")
    public ResponseEntity<Void> deleteIndustry(@PathVariable String id) {
        industryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
