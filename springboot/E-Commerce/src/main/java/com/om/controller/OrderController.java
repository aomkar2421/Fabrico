package com.om.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.om.Model.Address;
import com.om.Model.Order;
import com.om.Model.User;
import com.om.exception.OrderException;
import com.om.exception.UserException;
import com.om.service.OrderService;
import com.om.service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	@PostMapping("/")
	public ResponseEntity<Order>createOrder(@RequestBody Address shippingAddress,
			@RequestHeader("Authorization") String jwt) throws UserException{

		User user=userService.findUserProfileByJwt(jwt);
		Order order=orderService.createOrder(user, shippingAddress);
		System.out.println("order "+ order);

		return new ResponseEntity<Order>(order, HttpStatus.CREATED);
	}


	@GetMapping("/user")
	public ResponseEntity<List<Order>>usersOrderHistory(
			@RequestHeader("Authorization") String jwt) throws UserException{
		User user = userService.findUserProfileByJwt(jwt);
		List<Order> orders =orderService.usersOrderHistory(user.getId());
		return new ResponseEntity<>(orders, HttpStatus.CREATED);
	}


	@GetMapping("/{Id}")
	public ResponseEntity<Order>findOrderById(
			@PathVariable("Id") Long orderld,
			@RequestHeader("Authorization") String jwt) throws UserException, OrderException{
		User user = userService.findUserProfileByJwt(jwt);
		Order order =orderService.findOrderById(orderld);
		return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
	}
}
