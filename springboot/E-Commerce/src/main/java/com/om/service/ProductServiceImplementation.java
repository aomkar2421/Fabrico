package com.om.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.om.Model.Category;
import com.om.Model.Product;
import com.om.exception.ProductException;
import com.om.repository.CategoryRepository;
import com.om.repository.ProductRepository;
import com.om.request.CreateProductRequest;

@Service
public class ProductServiceImplementation implements ProductService {

	private UserService userService;
	private ProductRepository productRepository;
	private CategoryRepository categoryRepository;

	public ProductServiceImplementation(UserService userService, ProductRepository productRepository, CategoryRepository categoryRepository) {
		this.userService = userService;
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
	}

	@Override
	public Product createProduct(CreateProductRequest req) {

		Category topLevel = categoryRepository.findByName(req.getTopLavelCategory());

		if (topLevel==null) {
			Category topLavelCategory = new Category();
			topLavelCategory.setName(req.getTopLavelCategory());
			topLavelCategory.setLevel(1);

			topLevel = categoryRepository.save(topLavelCategory);
		}

		Category secondLevel = categoryRepository.findByNameAndParent(req.getSecondLavelCategory(), topLevel.getName());

		if (secondLevel==null) {
			Category secondLevelCategory = new Category();
			secondLevelCategory.setName(req.getSecondLavelCategory());
			secondLevelCategory.setParentCategory(topLevel);
			secondLevelCategory.setLevel(2);

			secondLevel = categoryRepository.save(secondLevelCategory);
		}

		Category thirdLevel = categoryRepository.findByNameAndParent(req.getThirdLavelCategory(), secondLevel.getName());

		if (thirdLevel==null) {
			Category thirdLevelCategory = new Category();
			thirdLevelCategory.setName(req.getThirdLavelCategory());
			thirdLevelCategory.setParentCategory(secondLevel);
			thirdLevelCategory.setLevel(3);

			thirdLevel = categoryRepository.save(thirdLevelCategory);
		}

		Product product =new Product();
		product.setTitle(req.getTitle());
		product.setColor(req.getColor());
		product.setDescription(req.getDescription());
		product.setDiscountedPrice(req.getDiscountedPrice());
		System.out.println("==========DISCOUNTED PERSENT=============="+req.getdiscountPersent());
		product.setDiscountPersent(req.getdiscountPersent());
		product.setImageUrl(req.getImageUrl());
		product.setBrand(req.getBrand());
		product.setPrice(req.getPrice());
		product.setSizes(req.getSizes());
		product.setQuantity(req.getQuantity());
		product.setCategory(thirdLevel);
		product.setCreatedAt(LocalDateTime.now());

		Product savedProduct = productRepository.save(product);
		return savedProduct;
	}

	
	@Override
	public String deleteProduct(Long productId) throws ProductException {
		Product product = findProductById(productId);
		product.getSizes().clear();
		productRepository.delete(product);
		return "Product Deleted Succesfully";
	}

	
	@Override
	public Product updateProduct(Long productId, Product req) throws ProductException {
		Product product = findProductById(productId);

		if (req.getQuantity()!=0) {
			product.setQuantity(req.getQuantity());
		}

		return productRepository.save(product);
	}

	
	@Override
	public Product findProductById(Long id) throws ProductException {
		Optional<Product> opt = productRepository.findById(id);

		if (opt.isPresent()) {
			return opt.get();
		}

		throw new ProductException("Product not found with given id - "+id);
	}

	
	@Override
	public List<Product> findProductByCategory(String category) throws ProductException {
		return null;
	}

	@Override
	public Page<Product> getAllProduct(String category, List<String> colors, List<String> sizes, Integer minPrice,
			Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {

		Pageable pageble = PageRequest.of(pageNumber, pageSize);

		List<Product> products = productRepository.filterProducts(category, minPrice, maxPrice, minDiscount, sort);

		if(!colors.isEmpty()) { 
			products=products.stream().filter(p -> colors.stream().anyMatch(c->c.equalsIgnoreCase(p.getColor())))
					.collect(Collectors.toList());
		}

		if(stock!=null) {
			if(stock.equals("in_stock")){
				products=products.stream().filter(p -> p.getQuantity()>0).collect(Collectors.toList());
			}
			else if (stock.equals("out_of_stock")) {
				products=products.stream().filter(p -> p.getQuantity()<1).collect(Collectors.toList());
			}

		}

		int startIndex = (int) pageble.getOffset();
		int endIndex = Math.min(startIndex+pageble.getPageSize(), products.size());

		List<Product> pageContent = products.subList(startIndex, endIndex);

		Page<Product> filteredProducts = new PageImpl<>(pageContent, pageble, products.size());
		return filteredProducts;
	}

	@Override
	public List<Product> findAllProducts() {
		List<Product> allProducts = productRepository.findAll();
		return allProducts;
	}
}