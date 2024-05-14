package com.medical.app.models.request;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorRequest {
    private Integer dni;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private String speciality;
    private String office;
    private String schedule;
    private String licenseNumber;
    private Long secretaryId;
}