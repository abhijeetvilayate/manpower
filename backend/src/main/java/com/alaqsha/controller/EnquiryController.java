package com.alaqsha.controller;

import com.alaqsha.dto.EnquiryRequestDto;
import com.alaqsha.entity.Enquiry;
import com.alaqsha.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    @Autowired
    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<Enquiry> submitEnquiry(@Valid @RequestBody EnquiryRequestDto dto) {
        Enquiry savedEnquiry = enquiryService.createEnquiry(dto);
        return new ResponseEntity<>(savedEnquiry, HttpStatus.CREATED);
    }
}
