package com.project.be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.be.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	Page<List<Product>> findByActiveTrue(Pageable page);
	
	Page<Product> findByCategoryIdAndActiveTrue(int id,Pageable pageable);

	Optional<Product> findByIdAndActiveTrue(int id);

	@Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) and p.active = true")
	Page searchByName(@Param("keyword") String keyword,Pageable pageable);
	
	@Query("SELECT p FROM Product p WHERE p.active = true ORDER BY p.id DESC")
	Page<Product> getProductsNew(Pageable page);
	
	@Query("SELECT p FROM Product p WHERE p.active = true ORDER BY p.sale DESC")
	Page<Product> getProductsSale(Pageable page);

	@Query("SELECT COUNT(p) FROM Product p WHERE p.active = true")
	int countAllActiveProducts();

}
