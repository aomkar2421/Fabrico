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

import com.om.Model.Rating;
import com.om.Model.Review;
import com.om.Model.User;
import com.om.exception.ProductException;
import com.om.exception.UserException;
import com.om.request.RatingRequest;
import com.om.service.RatingService;
import com.om.service.UserService;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

	@Autowired
	private UserService userService;

	@Autowired
	private RatingService ratingService;

	@PostMapping("/create")
	public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException{
		User user = userService.findUserProfileByJwt(jwt);
		Rating rating = ratingService.createRating(req, user);
		return new ResponseEntity<Rating>(rating, HttpStatus.CREATED);
	}

	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Rating>> getProductsRating (@PathVariable Long productId, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
		User user = userService.findUserProfileByJwt(jwt);
		List<Rating> ratings = ratingService.getProductsRating(productId);
		return new ResponseEntity<>(ratings, HttpStatus.CREATED);
	}
	
	
	@GetMapping("/product/{productId}/user/{userId}")
	public ResponseEntity<Rating> getProductRatingByUser(@PathVariable Long productId, @PathVariable Long userId){
		Rating rating = ratingService.getRatingByProductAndUser(productId, userId);
		
		if (rating == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(rating, HttpStatus.OK);
	}
	
}
