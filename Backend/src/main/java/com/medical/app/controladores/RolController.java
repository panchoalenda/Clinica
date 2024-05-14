package com.medical.app.controladores;

import com.medical.app.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles")
@CrossOrigin("http://localhost:5173")
public class RolController {
    @Autowired
    private RolRepository rolRepository;

    @GetMapping
    public ResponseEntity<?> findAll(){
        return  ResponseEntity.ok(rolRepository.findAll());
    }
}
