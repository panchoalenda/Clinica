package com.medical.app.models.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorResponseCompleto {
    private Long id;
    private Integer dni;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private String specialty;
    private String office;
    private String schedule;
    private String licenseNumber;
    private Long secretaryId;
}
