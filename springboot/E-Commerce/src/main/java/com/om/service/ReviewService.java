package com.om.service;

import java.util.List;

import com.om.Model.Review;
import com.om.Model.User;
import com.om.exception.ProductException;
import com.om.request.ReviewRequest;

public interface ReviewService {
	
	public Review createReview(ReviewRequest req, User user)throws ProductException;
	
	public List<Review> getAllReviews(Long productId);
	

}
