package com.medical.app.models.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.OptBoolean;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
class LocalTimeSerializer extends JsonSerializer<LocalTime> {

    @Override
    public void serialize(LocalTime localTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        String formattedTime = localTime.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        jsonGenerator.writeString(formattedTime);
    }
}
@Data
@Builder
public class AppointmentRequest {
    //private Long id;
    private LocalDate appointmentDate;
//    @JsonFormat(pattern = "HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @Schema(description = "Hora de la cita en formato HH:mm:ss", example = "09:00:00")
    @JsonSerialize(using = LocalTimeSerializer.class)
    private LocalTime appointmentTime;
    private Long doctorId;
    private Long patientId;
    private String description;
}
