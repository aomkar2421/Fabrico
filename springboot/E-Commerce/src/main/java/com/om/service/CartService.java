package com.om.service;

import com.om.Model.Cart;
import com.om.Model.User;
import com.om.exception.ProductException;
import com.om.request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);

}
