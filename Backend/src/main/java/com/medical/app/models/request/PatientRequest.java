package com.medical.app.models.request;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class PatientRequest {
    private Integer dni;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private Date birthDate;
    //private List<AppointmentRequest> medicalHistory;
    private String emergencyNumber;
    private Long secretaryId;
}
