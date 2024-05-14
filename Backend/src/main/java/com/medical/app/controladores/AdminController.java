package com.medical.app.controladores;

import com.medical.app.models.Admin;
import com.medical.app.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin ("http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<?> findByUser(@RequestBody Admin user) {
        System.out.println("datos del usuario: " + user.toString());
        return ResponseEntity.status(HttpStatus.OK).body(adminService.findAdmin(user));
    }
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Admin user) {
        System.err.println("El rol es " + user);
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.saveAdmin(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin user) {
       Admin userBD = adminService.findAdmin(user);
       if(userBD == null){
           System.out.println("El usuario no existe");
           return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
       }

        System.out.println("El usuario existe");
        System.out.println(userBD);
        return ResponseEntity.status(HttpStatus.OK).body(userBD);

    }


}
