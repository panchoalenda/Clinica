package com.medical.app.models.request;

import lombok.Data;

@Data
public class SecretaryModifyRequest {
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private String area;
    // Otros campos que puedan modificarse
}
