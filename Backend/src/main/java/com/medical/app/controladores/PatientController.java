package com.medical.app.controladores;


import com.medical.app.models.Secretary;
import com.medical.app.models.request.DoctorRequest;
import com.medical.app.models.request.PatientRequest;
import com.medical.app.models.response.DoctorResponse;
import com.medical.app.models.response.DoctorResponseCompleto;
import com.medical.app.models.response.PatientResponse;
import com.medical.app.models.response.PatientResponseComplete;
import com.medical.app.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
@CrossOrigin ("http://localhost:5173")
public class PatientController {
    @Autowired
    private PatientService patientService;



    @PostMapping("/create-patient")
    public ResponseEntity<?> createPatient(@RequestBody PatientRequest patientRequest) {
        System.out.println(patientRequest.toString());
        if (patientRequest.getDni() == null) {
            return new ResponseEntity<>("El campo DNI no puede ser nulo", HttpStatus.BAD_REQUEST);
        }
            PatientResponse createdPatient = patientService.createPatient(patientRequest);
            return ResponseEntity.ok().body(createdPatient);

    }

    @GetMapping
    public ResponseEntity<List<PatientResponse>> getPatients(){
        try {
            return ResponseEntity.ok().body(patientService.getPatients());
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    @GetMapping("{id}")
    public ResponseEntity<PatientResponseComplete> getPatient(@RequestParam Long id){
        return ResponseEntity.ok().body(patientService.getPatient(id));
    }

    @PutMapping("modify-patient")
    public ResponseEntity<PatientResponse> modifyPatient(@RequestParam Long id, @RequestBody PatientRequest patientRequest){

        return ResponseEntity.ok().body(patientService.modifyPatient(id, patientRequest));
    }

    @DeleteMapping("delete-patient")
    public ResponseEntity<String> deletePatient(@RequestParam Long id){
        patientService.deletePatient(id);

        return ResponseEntity.ok().body("doctor deleted with exit");
    }

    @GetMapping("/dni/{dniString}")
    public ResponseEntity<PatientResponseComplete> getPatientPorDni(@PathVariable String dniString){
        System.err.println("*************El dni del paciente es: " + dniString +" ***************** ");
        int dni = Integer.parseInt(dniString);
       // System.err.println("*************El dni del paciente es: " + patientService.getPatientByDni(dni).toString() +" ***************** ");
        return ResponseEntity.ok().body(patientService.getPatientByDni(dni));
    }
}
