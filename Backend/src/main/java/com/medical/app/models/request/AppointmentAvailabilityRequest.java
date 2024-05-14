package com.medical.app.models.request;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class AppointmentAvailabilityRequest {
    private String speciality;
    private LocalDate date;
    @Schema(description = "Hora de la cita en formato HH:mm:ss", example = "09:00:00")
    @JsonSerialize(using = LocalTimeSerializer.class)
    private LocalTime time;
}
