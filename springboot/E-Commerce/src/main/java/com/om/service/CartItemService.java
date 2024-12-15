package com.om.service;

import com.om.Model.Cart;
import com.om.Model.CartItem;
import com.om.Model.Product;
import com.om.exception.CartItemException;
import com.om.exception.UserException;

public interface CartItemService {
	
	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;
	
	public CartItem isCartItemExist(Cart cart, Product product, String size, long userId);
	
	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;
	
	public CartItem findCartItemById(long cartItemId) throws CartItemException;

}
