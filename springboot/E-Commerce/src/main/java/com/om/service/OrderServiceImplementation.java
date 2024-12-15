package com.om.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.om.Model.Address;
import com.om.Model.Cart;
import com.om.Model.CartItem;
import com.om.Model.Order;
import com.om.Model.OrderItem;
import com.om.Model.User;
import com.om.exception.OrderException;
import com.om.repository.AddressRepository;
import com.om.repository.CartRepository;
import com.om.repository.OrderItemRepository;
import com.om.repository.OrderRepository;
import com.om.repository.UserRepository;

@Service
public class OrderServiceImplementation implements OrderService{

	private OrderRepository orderRepository;
	private CartService cartService;
	private AddressRepository addressRepository;
	private UserRepository userRepository;
	private OrderItemService orderItemService;
	private OrderItemRepository orderItemRepository;



	public OrderServiceImplementation(OrderRepository orderRepository, CartService cartService,
			AddressRepository addressRepository, UserRepository userRepository, OrderItemService orderItemService,
			OrderItemRepository orderItemRepository) {
		super();
		this.orderRepository = orderRepository;
		this.cartService = cartService;
		this.addressRepository = addressRepository;
		this.userRepository = userRepository;
		this.orderItemService = orderItemService;
		this.orderItemRepository = orderItemRepository;
	}


	@Override
	public Order createOrder(User user, Address shippingAdress) {

		shippingAdress.setUser(user);
		Address address= addressRepository.save(shippingAdress);
		user.getAddress().add(address);
		userRepository.save(user);

		Cart cart=cartService.findUserCart(user.getId());
		List<OrderItem> orderItems=new ArrayList<>();

		for(CartItem item: cart.getCartitems()) {
			OrderItem orderItem=new OrderItem();
			orderItem.setPrice(item.getPrice());
			orderItem.setProduct(item.getProduct());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setSize(item.getSize());
			orderItem.setUserId(item.getUserld());
			orderItem.setDiscountedPrice(item.getDiscountedPrice());

			OrderItem createdOrderItem = orderItemRepository.save(orderItem);
			orderItems.add(createdOrderItem);
		}

		Order createdOrder=new Order();
		
		createdOrder.setUser(user);
		createdOrder.setOrderltems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscounte (cart.getDiscounte());
		createdOrder.setTotalltem (cart.getTotalltem());
		createdOrder.setShippingAddress(address);
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.getPaymentDetails().setStatus("PENDING");
		createdOrder.setCreatedAt(LocalDateTime.now());
		
		Order savedOrder=orderRepository.save(createdOrder);
		
		for (OrderItem item : orderItems) {
			item.setOrder(savedOrder);
			orderItemRepository.save(item);
		}

		return savedOrder;
	}

	@Override
	public Order findOrderById(Long orderld) throws OrderException {

		Optional<Order> opt = orderRepository.findById(orderld);
		
		if (opt.isPresent()) {
			return opt.get();
		}
		
		throw new OrderException("Order not exists with given order id "+orderld);
	}

	@Override
	public List<Order> usersOrderHistory(Long userld) {
		List<Order> orders = orderRepository.getUsersOrders(userld);
		return orders;
	}

	@Override
	public Order placedOrder(Long orderld) throws OrderException {
		Order order = findOrderById(orderld);
		order.setOrderStatus("PLACED");
		order.getPaymentDetails().setStatus("COMPLETED");
		return orderRepository.save(order);
	}

	@Override
	public Order confirmedOrder(Long orderld) throws OrderException {
		Order order = findOrderById(orderld);
		order.setOrderStatus("CONFIRMED");
		return orderRepository.save(order);
	}

	@Override
	public Order shippedOrder(Long orderld) throws OrderException {
		Order order = findOrderById(orderld);
		order.setOrderStatus("SHIPPED");
		return order;
	}

	@Override
	public Order deliveredOrder(Long orderld) throws OrderException {
		Order order = findOrderById(orderld);
		order.setOrderStatus("DELIVERED");
		return orderRepository.save(order);
	}

	@Override
	public Order cancledOrder(Long orderld) throws OrderException {
		Order order = findOrderById(orderld);
		order.setOrderStatus("CANCELED");
		return orderRepository.save(order);
	}

	@Override
	public List<Order> gellALLOrders() {
		return orderRepository.findAll();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		orderRepository.deleteById(orderId);
	}

}
