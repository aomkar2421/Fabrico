package com.om.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.om.Model.Product;
import com.om.Model.Rating;
import com.om.Model.User;
import com.om.exception.ProductException;
import com.om.repository.RatingRepository;
import com.om.request.RatingRequest;

@Service
public class RatingServiceImplemenataion implements RatingService{
	
	private RatingRepository ratingRepository;
	private ProductService productService;
	
	public RatingServiceImplemenataion(RatingRepository ratingRepository, ProductService productService) {
		super();
		this.ratingRepository = ratingRepository;
		this.productService = productService;
	}

	@Override
	public Rating createRating(RatingRequest req, User user) throws ProductException {

		Product product = productService.findProductById(req.getProductId());
		
		Rating rating = new Rating();
		rating.setProduct(product);
		rating.setCreatedAt(LocalDateTime.now());
		rating.setRating(req.getRating());
		rating.setUser(user);
		
		return ratingRepository.save(rating);
	}

	@Override
	public List<Rating> getProductsRating(long productId) {	
		return ratingRepository.getAllProductsRating(productId);
	}

	@Override
	public Rating getRatingByProductAndUser(Long productId, Long userId) {
		return ratingRepository.findByProductIdAndUserId(productId, userId);
	}

}
