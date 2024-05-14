package com.medical.app.models.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentResponseDetails {
    private Long id;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String doctor;
    private String patient;
    private boolean reminder;
    private boolean status;
}

//public class AppointmentResponse {
//    private Long id;
//    private LocalDate appointmentDate;
//    private LocalTime appointmentTime;
//    private Long doctorId;
//    private Long patientId;
//    private boolean reminder;
//    private boolean status;
//}