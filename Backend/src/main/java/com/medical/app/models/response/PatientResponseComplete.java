package com.medical.app.models.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class PatientResponseComplete {
    private Long Id;
    private int dni;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private Date birthDate;
    /*
        @JsonInclude(JsonInclude.Include.NON_EMPTY)
        private List<AppointmentResponse> medicalHistory;*/
    private String emergencyNumber;
    private Long secretaryId;
}
