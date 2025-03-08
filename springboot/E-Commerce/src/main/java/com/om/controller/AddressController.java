package com.om.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.om.Model.Address;
import com.om.Model.User;
import com.om.exception.UserException;
import com.om.service.AddressService;
import com.om.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/user")
    public ResponseEntity<List<Address>> getAllUserAddresses(
            @RequestHeader("Authorization") String jwt) throws UserException {
        
        User user = userService.findUserProfileByJwt(jwt);
        List<Address> addresses = addressService.getAllAddressesByUser(user.getId());
        
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Address> getAddressByOrderId(
            @PathVariable Long orderId) {
        
        Address address = addressService.getAddressByOrderId(orderId);
        
        if (address == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        return new ResponseEntity<>(address, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Address> createAddress(
            @RequestBody Address address,
            @RequestHeader("Authorization") String jwt) throws UserException {
        
        User user = userService.findUserProfileByJwt(jwt);
        Address createdAddress = addressService.createAddress(address, user);
        
        return new ResponseEntity<>(createdAddress, HttpStatus.CREATED);
    }
}