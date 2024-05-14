package com.medical.app.models.response;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorResponse {

    private Long id;
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
