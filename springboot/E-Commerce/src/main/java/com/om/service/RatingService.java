package com.om.service;

import java.util.List;

import com.om.Model.Rating;
import com.om.Model.User;
import com.om.exception.ProductException;
import com.om.request.RatingRequest;

public interface RatingService {
	
	public Rating createRating(RatingRequest req, User user) throws ProductException;

	public List<Rating> getProductsRating(long productId);
	
	public Rating getRatingByProductAndUser(Long productId, Long userId);
}
