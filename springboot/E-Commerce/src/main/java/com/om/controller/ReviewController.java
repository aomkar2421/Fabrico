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
import com.om.request.ReviewRequest;
import com.om.service.RatingService;
import com.om.service.ReviewService;
import com.om.service.UserService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

	@Autowired
	private UserService userService;

	@Autowired
	private ReviewService reviewService;

	@PostMapping("/create")
	public ResponseEntity<Review> createReview(@RequestBody ReviewRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException{
		User user = userService.findUserProfileByJwt(jwt);
		Review review = reviewService.createReview(req, user);
		return new ResponseEntity<Review>(review, HttpStatus.CREATED);
	}



	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Review>> getProductsReview(@PathVariable Long productId
			) throws UserException, ProductException{
		List<Review> reviews = reviewService.getAllReviews(productId);
		return new ResponseEntity<>(reviews, HttpStatus.CREATED);
	}
}
