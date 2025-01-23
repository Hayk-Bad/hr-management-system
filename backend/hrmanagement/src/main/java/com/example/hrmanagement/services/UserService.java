package com.example.hrmanagement.services;

import com.example.hrmanagement.models.User;
import com.example.hrmanagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Create a new user
    public User createUser(String username, String password, String role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // Hash password
        user.setRole(role);
        return userRepository.save(user);
    }

    // Find a user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Fetch a single user by ID
    public User getUserById(UUID id) {
        return userRepository.findById(id)
                ;
    }

    // Add a new user
    public User addUser(User user) {
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Update an existing user
    public User updateUser(UUID id, User updatedUser) {
        User existingUser = userRepository.findById(id)
            ;

        existingUser.setUsername(updatedUser.getUsername());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // Update password
        }
        existingUser.setRole(updatedUser.getRole());
        return userRepository.save(existingUser);
    }

    // Delete a user by ID
   // public void deleteUser(UUID id) {
   //     if (!userRepository.existsById(id)) {
   //         throw new EntityNotFoundException("User not found with ID: " + id);
   //     }
   //     userRepository.deleteById(id);
   // }
}
