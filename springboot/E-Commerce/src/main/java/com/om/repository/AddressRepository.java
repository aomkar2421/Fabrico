package com.om.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.om.Model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

}
