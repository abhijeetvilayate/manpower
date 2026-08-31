package com.alaqsha.service.impl;

import com.alaqsha.dto.EnquiryRequestDto;
import com.alaqsha.entity.Enquiry;
import com.alaqsha.repository.EnquiryRepository;
import com.alaqsha.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnquiryServiceImpl implements EnquiryService {

    private final EnquiryRepository enquiryRepository;

    @Autowired
    public EnquiryServiceImpl(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    @Override
    public Enquiry createEnquiry(EnquiryRequestDto dto) {
        Enquiry enquiry = new Enquiry();
        enquiry.setFullName(dto.getFullName());
        enquiry.setEmail(dto.getEmail());
        enquiry.setPhone(dto.getPhone());
        enquiry.setServiceRequired(dto.getServiceRequired());
        enquiry.setMessage(dto.getMessage());
        return enquiryRepository.save(enquiry);
    }
}
