package com.alaqsha.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "job_openings")
public class JobOpening {

    @Id
    private String id;

    private String title;
    private String location;
    private String type;
    private String salary;
    private String requirements;
    private LocalDate deadline;

    public JobOpening() {}

    public JobOpening(String id, String title, String location, String type, String salary, String requirements, LocalDate deadline) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.type = type;
        this.salary = salary;
        this.requirements = requirements;
        this.deadline = deadline;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    public String getRequirements() { return requirements; }
    public void setRequirements(String requirements) { this.requirements = requirements; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
}
