package com.om.request;

import java.util.HashSet;
import java.util.Set;

import com.om.Model.Size;

public class CreateProductRequest {
	
	private String title;
	
	private String description;
	
	private int price;
	
	private int discountedPrice;
	
	private int discountPersent;
	
	private int quantity;
	
	private String brand;
	
	private String color;
	
	private Set<Size> sizes = new HashSet<>();
	
	private String imageUrl;
	
	private String topLavelCategory;
	
	private String secondLavelCategory;
	
	private String thirdLavelCategory;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getDiscountedPrice() {
		return discountedPrice;
	}

	public void setDiscountedPrice(int discountedPrice) {
		this.discountedPrice = discountedPrice;
	}

	public int getdiscountPersent() {
		return discountPersent;
	}

	public void setdiscountPersent(int discountPersent) {
		discountPersent = (int) (((double) (getPrice() - getDiscountedPrice()) / getPrice()) * 100);
		System.out.println();
		System.out.println("========DISCOUNT PERSENT IS : "+discountPersent+"===========");
		System.out.println();
		this.discountPersent = discountPersent;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Set<Size> getSizes() {
		return sizes;
	}

	public void setSizes(Set<Size> sizes) {
		this.sizes = sizes;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getTopLavelCategory() {
		return topLavelCategory;
	}

	public void setTopLavelCategory(String topLavelCategory) {
		this.topLavelCategory = topLavelCategory;
	}

	public String getSecondLavelCategory() {
		return secondLavelCategory;
	}

	public void setSecondLavelCategory(String secondLavelCategory) {
		this.secondLavelCategory = secondLavelCategory;
	}

	public String getThirdLavelCategory() {
		return thirdLavelCategory;
	}

	public void setThirdLavelCategory(String thirdLavelCategory) {
		this.thirdLavelCategory = thirdLavelCategory;
	}

}