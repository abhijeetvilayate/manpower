package com.alaqsha.service;

import com.alaqsha.entity.Industry;
import java.util.List;

public interface IndustryService {
    List<Industry> getAllActiveIndustries();
    Industry getIndustryById(String id);
}