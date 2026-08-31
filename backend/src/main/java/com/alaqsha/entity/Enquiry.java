package com.alaqsha.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "enquiries")
public class Enquiry {

    @Id
    private String id;

    private String fullName;
    private String email;
    private String phone;
    private String serviceRequired;
    private String sourceType; // "ENQUIRY_FORM" or "GET_IN_TOUCH"
    private String message;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Enquiry() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getServiceRequired() { return serviceRequired; }
    public void setServiceRequired(String serviceRequired) { this.serviceRequired = serviceRequired; }

    public String getSourceType() { return sourceType; }
    public void setSourceType(String sourceType) { this.sourceType = sourceType; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
