package com.om.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.om.Model.Address;
import com.om.Model.User;
import com.om.repository.AddressRepository;
import com.om.repository.OrderRepository;

import java.util.List;

@Service
public class AddressServiceImplementation implements AddressService {

    @Autowired
    private AddressRepository addressRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Override
    public List<Address> getAllAddressesByUser(Long userId) {
        return addressRepository.findByUserId(userId);
    }
    
    @Override
    public Address getAddressByOrderId(Long orderId) {
        return addressRepository.findAddressByOrderId(orderId);
    }

	@Override
	public Address createAddress(Address address, User user) {
		// TODO Auto-generated method stub
		return null;
	}
    

}