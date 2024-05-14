package com.medical.app.controladores;

import com.medical.app.models.Secretary;
import com.medical.app.models.request.SecretaryModifyRequest;
import com.medical.app.models.request.SecretaryRequest;
import com.medical.app.models.response.SecretaryResponse;
import com.medical.app.models.response.SecretaryResponseComplete;
import com.medical.app.services.SecretaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("secretaries")
@CrossOrigin ("http://localhost:5173")
public class SecretaryController {

    @Autowired
    private SecretaryService secretaryService;

    @PostMapping("/create-secretary")
    public ResponseEntity<SecretaryResponse> createSecretary(@RequestBody SecretaryRequest secretaryRequest) {
        SecretaryResponse createdSecretary = secretaryService.createSecretary(secretaryRequest);
        return ResponseEntity.ok().body(createdSecretary);
    }

    @GetMapping("/get-secretaries")
    public ResponseEntity<List<SecretaryResponse>> getSecretaries() {
        try {
            List<SecretaryResponse> secretaryResponses = secretaryService.getSecretaries();
            return ResponseEntity.ok().body(secretaryResponses);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    @GetMapping("/buscar-por-dni/{dni}")
    public ResponseEntity<?> findById(@PathVariable Integer dni) {
      Optional<Secretary> secretaryResponse = secretaryService.findById(dni);

        if (secretaryResponse.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(secretaryResponse);
        }

        return ResponseEntity.ok().body(secretaryResponse);
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<SecretaryResponseComplete> getSecretaryByDni(@PathVariable Integer dni) {
        System.out.println("El dni es :" + dni);
        SecretaryResponseComplete secretaryResponse = secretaryService.getSecretaryByDni(dni);

        if (secretaryResponse != null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(secretaryResponse);
        }

        return ResponseEntity.ok().body(secretaryResponse);
    }

    @PutMapping("modify-secretary")
    public ResponseEntity<SecretaryResponse> createMedico(@RequestParam Integer dni, @RequestBody SecretaryModifyRequest modifyRequest){

        return ResponseEntity.ok().body(secretaryService.modifySecretaryByDni(dni, modifyRequest));
    }


    @DeleteMapping("delete-secretary")
    public ResponseEntity<String> deleteSecretary(@RequestParam Long id){
        secretaryService.deleteSecretary(id);

        return ResponseEntity.ok().body("secretario eliminado");
    }

    @GetMapping("{id}")
    public ResponseEntity<SecretaryResponseComplete> getSecretaryById(@PathVariable Long id) {
        SecretaryResponseComplete secretaryResponse = secretaryService.getSecretaryById(id);

        if (secretaryResponse == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(secretaryResponse);
        }

        return ResponseEntity.ok().body(secretaryResponse);
    }


}