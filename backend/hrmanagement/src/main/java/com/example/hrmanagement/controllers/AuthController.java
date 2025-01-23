package com.example.hrmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.hrmanagement.payload.JwtResponse;
import com.example.hrmanagement.payload.LoginRequest;
import com.example.hrmanagement.security.JwtTokenProvider;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Simulate authentication; always return success
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Retrieve the user's role (if it exists)
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        // Generate a JWT
        String jwt = jwtTokenProvider.generateToken(authentication.getName(), role);

        return ResponseEntity.ok(new JwtResponse(jwt, role));
    }
}
