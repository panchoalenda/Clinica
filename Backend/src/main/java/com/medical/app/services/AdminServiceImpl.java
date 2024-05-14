package com.medical.app.services;

import com.medical.app.models.Admin;
import com.medical.app.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdminRepository adminRepository;

    @Override
    @Transactional(readOnly = true)
    public Admin findAdmin(Admin admin) {
        String u = admin.getUsername();
        String p = admin.getPassword();

        Optional<Admin> o = adminRepository.findAdmin(u, p);
        if (o.isPresent()) {
            return o.orElseThrow();
        }
        return null;
    }

    @Override
    @Transactional
    public Admin saveAdmin(Admin admin) {
//        Admin admiNew = null;
//        Optional<Rol> rolBD = adminRepository.findAdminRoles(admin.getRol().getRolName());
//        if (rolBD.isPresent()){
//            admiNew = rolBD.orElseThrow()
//        }
        return adminRepository.save(admin);
    }
}
