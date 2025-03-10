package com.om.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.om.Model.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long>{
	
	@Query("SELECT r From Rating r Where r.product.id=:productId")
	public List<Rating> getAllProductsRating(@Param("productId")Long productId);
	
	@Query("SELECT r From Rating r Where r.product.id=:productId AND r.user.id=:userId")
	public Rating findByProductIdAndUserId(@Param("productId")Long productId, @Param("userId")Long userId);

}
