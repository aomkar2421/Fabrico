package com.om.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.om.Model.Address;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    
    List<Address> findByUserId(Long userId);
    
    @Query("SELECT o.shippingAddress FROM Order o WHERE o.id = :orderId")
    Address findAddressByOrderId(@Param("orderId") Long orderId);
}
