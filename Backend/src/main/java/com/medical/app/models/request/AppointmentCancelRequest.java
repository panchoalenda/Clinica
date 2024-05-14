package com.medical.app.models.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class AppointmentCancelRequest {
    private int patientDni;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;

}
