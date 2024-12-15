package com.om.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.om.Model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
