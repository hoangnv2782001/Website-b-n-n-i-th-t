package com.project.be.service;

import java.util.List;

import com.project.be.dto.request.ProductDto;
import com.project.be.dto.response.Message;
import com.project.be.dto.response.PageResponse;
import com.project.be.dto.response.ProductResponse;
import com.project.be.model.OrderItem;

public interface ProductService {

	ProductResponse getProductById(int id);

	List<ProductResponse> getAllProduct(int page, int size);
	
	List<ProductResponse> getProducts(String param);
	
	PageResponse getProductByCategory(int id,int page,int size,String[] sort);
	
	PageResponse searchProduct(String param,int page,int size,String[] sort);

	int createProduct(ProductDto ProductDto);
	
	void updateQuantity(List<OrderItem> orderItems);

	Message delete(int id);

	Message update(int id, ProductDto productDto);

}
