package com.om.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.om.Model.CartItem;
import com.om.Model.User;
import com.om.exception.CartItemException;
import com.om.exception.UserException;
import com.om.request.ApiResponse;
import com.om.service.CartItemService;
import com.om.service.UserService;

@RestController
@RequestMapping("/api/cart_item")
public class CartItemController {
	
	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private UserService userService;
	
	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<ApiResponse>deleteCartItem(@PathVariable long cartItemId, @RequestHeader("Authorization")String jwt) throws UserException,  CartItemException{
		
		User user = userService.findUserProfileByJwt(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);
		
		ApiResponse res = new ApiResponse();
		res.setMessage("Item Removed from Cart");
		res.setStatus(true);
		
		return new ResponseEntity<>(res, HttpStatus.OK);
	}
	

	@PutMapping("/{cartItemId}")
	public ResponseEntity<CartItem>updateCartItem( @RequestBody CartItem cartItem ,@PathVariable long cartItemId, @RequestHeader("Authorization")String jwt) throws UserException,  CartItemException{
		
		User user = userService.findUserProfileByJwt(jwt);

		CartItem updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
		
		return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
	}
	

}
