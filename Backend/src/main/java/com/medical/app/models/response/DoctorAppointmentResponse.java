package com.medical.app.models.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorAppointmentResponse {
    private Long id;
    private String dni;
}
