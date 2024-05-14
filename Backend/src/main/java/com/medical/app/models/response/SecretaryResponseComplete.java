package com.medical.app.models.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SecretaryResponseComplete {
    private Long id;
    private int dni;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private String area;

/*
    public static SecretaryResponseComplete error(String errorMessage) {
        if (errorMessage != null) {
            return SecretaryResponseComplete.builder().errorMessage(errorMessage).build();
        } else {
            return SecretaryResponseComplete.builder().build();
        }
    }*/
}