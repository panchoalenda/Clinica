package com.medical.app.controladores;

import com.medical.app.models.request.DoctorRequest;
import com.medical.app.models.response.DoctorResponse;
import com.medical.app.models.response.DoctorResponseCompleto;
import com.medical.app.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("doctor")
@CrossOrigin ("http://localhost:5173")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("create-doctor")
    public ResponseEntity<DoctorResponse> createMedico(@RequestBody DoctorRequest doctorRequest){

        return ResponseEntity.ok().body(doctorService.createDoctor(doctorRequest));
    }


    @GetMapping("/get-doctor")
    public ResponseEntity<List<DoctorResponse>> getMedicos(){
        try {
            return ResponseEntity.ok().body(doctorService.getDoctors());
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    @GetMapping("{id}")
    public ResponseEntity<DoctorResponseCompleto> getMedico(@RequestParam Long id){
        return ResponseEntity.ok().body(doctorService.getDoctor(id));
    }


    @PutMapping("modify-doctor")
    public ResponseEntity<DoctorResponse> modifyMedico(@RequestParam Long id, @RequestBody DoctorRequest doctorRequest){

        return ResponseEntity.ok().body(doctorService.modifyDoctor(id, doctorRequest));
    }

    @DeleteMapping("delete-doctor")
    public ResponseEntity<String> deleteMedico(@RequestParam Long id){
        doctorService.deleteDoctor(id);

        return ResponseEntity.ok().body("doctor deleted with exit");
    }

    @GetMapping("/dni/{dniString}")
    public ResponseEntity<DoctorResponseCompleto> getDoctorByDni(@PathVariable String dniString){
        System.err.println("*************El dni del paciente es: " + dniString +" ***************** ");

        int dni = Integer.parseInt(dniString);
        return ResponseEntity.ok().body(doctorService.getDoctorByDni(dni));
    }
}
