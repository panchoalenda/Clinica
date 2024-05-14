package com.medical.app.models.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SecretaryResponse {
    private int dni;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private String area;


/*
    public static SecretaryResponse error(String errorMessage) {
        if (errorMessage != null) {
            return SecretaryResponse.builder().errorMessage(errorMessage).build();
        } else {
            return SecretaryResponse.builder().build();
        }
    }*/
}
