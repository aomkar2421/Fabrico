package com.om.service;

import java.util.List;

import com.om.Model.Address;
import com.om.Model.User;

public interface AddressService {
    List<Address> getAllAddressesByUser(Long userId);
    Address getAddressByOrderId(Long orderId);
    Address createAddress(Address address, User user);
}