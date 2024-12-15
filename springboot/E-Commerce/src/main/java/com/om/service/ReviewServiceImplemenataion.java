package com.om.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.om.Model.Product;
import com.om.Model.Rating;
import com.om.Model.Review;
import com.om.Model.User;
import com.om.exception.ProductException;
import com.om.repository.ProductRepository;
import com.om.repository.ReviewRepository;
import com.om.request.RatingRequest;
import com.om.request.ReviewRequest;

@Service
public class ReviewServiceImplemenataion implements ReviewService {

	private ReviewRepository reviewRepository;
	private ProductService productService;
	private ProductRepository productRepository;

	public ReviewServiceImplemenataion (ReviewRepository reviewRepository, ProductService productService, ProductRepository productRepository) {
		this.reviewRepository=reviewRepository;
		this.productService=productService;
		this.productRepository = productRepository;
	}
	
	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		Product product = productService.findProductById(req.getProductId());
		
		Review review=new Review();
		
		review.setUser(user);
		review.setProduct(product);
		review.setReview(req.getReview());
		review.setCreatedAt(LocalDateTime.now());
		
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllReviews(Long productId) {
		// TODO Auto-generated method stub
		return reviewRepository.getAllProductsReview(productId);
	}

}
