package com.alaqsha.controller;

import com.alaqsha.entity.ServiceItem;
import com.alaqsha.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceService serviceService;

    @Autowired
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseEntity<List<ServiceItem>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }
}
