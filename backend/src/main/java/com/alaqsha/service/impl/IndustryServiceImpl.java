package com.alaqsha.service.impl;

import com.alaqsha.entity.Industry;
import com.alaqsha.repository.IndustryRepository;
import com.alaqsha.service.IndustryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IndustryServiceImpl implements IndustryService {

    private final IndustryRepository industryRepository;

    @Autowired
    public IndustryServiceImpl(IndustryRepository industryRepository) {
        this.industryRepository = industryRepository;
    }

    @Override
    public List<Industry> getAllActiveIndustries() {
        return industryRepository.findAll();
    }

    @Override
    public Industry getIndustryById(String id) {
        return industryRepository.findById(id).orElse(null);
    }
}
