package com.alaqsha.service.impl;

import com.alaqsha.entity.ServiceItem;
import com.alaqsha.repository.ServiceRepository;
import com.alaqsha.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceServiceImpl(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public List<ServiceItem> getAllServices() {
        return serviceRepository.findAll();
    }
}