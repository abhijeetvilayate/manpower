package com.alaqsha.dto;

import java.util.List;

public class ServiceResponseDto {

    private Long id;
    private String title;
    private String category;
    private String icon;
    private String imageUrl;
    private String description;
    private List<String> features;

    public ServiceResponseDto() {}

    public ServiceResponseDto(Long id, String title, String category, String icon, String imageUrl, String description, List<String> features) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.icon = icon;
        this.imageUrl = imageUrl;
        this.description = description;
        this.features = features;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }
}
