package com.project.be.service;

import java.util.List;

import com.project.be.dto.request.CategoryDto;
import com.project.be.dto.response.CategoryResponse;
import com.project.be.dto.response.Message;
import com.project.be.dto.response.ProductResponse;

public interface CategoryService {
	CategoryResponse getCategoryById(int id);



	List<CategoryResponse> getAllCategory();
	
	List<CategoryResponse> searchCategory(String param);

	int createCategory(CategoryDto categoryDto);

	Message delete(int id);

	Message update(int id, CategoryDto categoryDto);

}
