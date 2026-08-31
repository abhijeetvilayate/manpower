package com.alaqsha.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contact_info")
public class ContactInfo {

    @Id
    private String id = "1";

    private String phonePrimary;
    private String phoneSecondary;
    private String emailPrimary;
    private String emailSecondary;
    private String address;
    private String workingHoursWeekdays;
    private String workingHoursWeekend;

    public ContactInfo() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPhonePrimary() { return phonePrimary; }
    public void setPhonePrimary(String phonePrimary) { this.phonePrimary = phonePrimary; }

    public String getPhoneSecondary() { return phoneSecondary; }
    public void setPhoneSecondary(String phoneSecondary) { this.phoneSecondary = phoneSecondary; }

    public String getEmailPrimary() { return emailPrimary; }
    public void setEmailPrimary(String emailPrimary) { this.emailPrimary = emailPrimary; }

    public String getEmailSecondary() { return emailSecondary; }
    public void setEmailSecondary(String emailSecondary) { this.emailSecondary = emailSecondary; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getWorkingHoursWeekdays() { return workingHoursWeekdays; }
    public void setWorkingHoursWeekdays(String workingHoursWeekdays) { this.workingHoursWeekdays = workingHoursWeekdays; }

    public String getWorkingHoursWeekend() { return workingHoursWeekend; }
    public void setWorkingHoursWeekend(String workingHoursWeekend) { this.workingHoursWeekend = workingHoursWeekend; }
}
