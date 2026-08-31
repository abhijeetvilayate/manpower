package com.alaqsha.service;

import com.alaqsha.dto.EnquiryRequestDto;
import com.alaqsha.entity.Enquiry;

public interface EnquiryService {
    Enquiry createEnquiry(EnquiryRequestDto dto);
}
