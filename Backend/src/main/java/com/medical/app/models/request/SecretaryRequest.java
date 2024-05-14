package com.medical.app.models.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SecretaryRequest {
    private int dni;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private String area;
}
