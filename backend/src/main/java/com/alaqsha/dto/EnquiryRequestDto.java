package com.alaqsha.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EnquiryRequestDto {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String serviceRequired;

    private String message;

    public EnquiryRequestDto() {}

    public EnquiryRequestDto(String fullName, String email, String phone, String serviceRequired, String message) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.serviceRequired = serviceRequired;
        this.message = message;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getServiceRequired() {
        return serviceRequired;
    }

    public void setServiceRequired(String serviceRequired) {
        this.serviceRequired = serviceRequired;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
