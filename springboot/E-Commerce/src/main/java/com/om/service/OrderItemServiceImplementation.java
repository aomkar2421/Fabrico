package com.om.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.om.Model.OrderItem;
import com.om.repository.OrderItemRepository;

@Service
public class OrderItemServiceImplementation implements OrderItemService {
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	public OrderItemServiceImplementation(OrderItemRepository orderItemRepository) {
		this.orderItemRepository = orderItemRepository;
	}

	@Override
	public OrderItem createOrderItem(OrderItem orderItem) {
		return orderItemRepository.save(orderItem);
	}

}
