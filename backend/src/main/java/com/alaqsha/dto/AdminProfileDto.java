package com.alaqsha.dto;

public class AdminProfileDto {

    private String oldPassword;
    private String newUsername;
    private String newPassword;

    public AdminProfileDto() {}

    public AdminProfileDto(String oldPassword, String newUsername, String newPassword) {
        this.oldPassword = oldPassword;
        this.newUsername = newUsername;
        this.newPassword = newPassword;
    }

    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }

    public String getNewUsername() { return newUsername; }
    public void setNewUsername(String newUsername) { this.newUsername = newUsername; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
