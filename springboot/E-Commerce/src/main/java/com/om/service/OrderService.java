package com.om.service;

import java.util.List;

import com.om.Model.Address;
import com.om.Model.Order;
import com.om.Model.User;
import com.om.exception.OrderException;

public interface OrderService {

	public Order createOrder(User user, Address shippingAdress);

	public Order findOrderById(Long orderld) throws OrderException;

	public List<Order> usersOrderHistory(Long userld);

	public Order placedOrder (Long orderld) throws OrderException;

	public Order confirmedOrder(Long orderld) throws OrderException;

	public Order shippedOrder (Long orderld) throws OrderException;

	public Order deliveredOrder (Long orderld) throws OrderException;

	public Order cancledOrder(Long orderld) throws OrderException;
	
	public List<Order> gellALLOrders();
	
	public void deleteOrder(Long orderId) throws OrderException;

}
