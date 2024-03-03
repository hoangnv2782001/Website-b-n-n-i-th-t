package com.project.be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.be.common.OrderStatus;
import com.project.be.model.Order;
import com.project.be.model.Product;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'COMPLETED'")
	int countCompletedOrders();
	
	
	Page<Order> findByStatusEqualsOrderByCreatedAtDesc(OrderStatus status,Pageable page);
	
	List<Order> findByStatusEqualsOrderByCreatedAtDesc(OrderStatus status);
	
	Page<Order> findByUserIdAndStatusEqualsOrderByCreatedAtDesc(int id,OrderStatus status,Pageable pageable);
	
	Page<Order> findByUserIdOrderByCreatedAtDesc(int id,Pageable pageable);
	
	@Query("SELECT p FROM Order p WHERE LOWER(p.code) LIKE LOWER(CONCAT('%', :keyword, '%')) and p.status = :status ORDER BY p.createdAt DESC")
	List<Order> search(@Param("keyword") String keyword,@Param("status") OrderStatus status);
	
	@Query("SELECT p FROM Order p WHERE LOWER(p.code) LIKE LOWER(CONCAT('%', :keyword, '%'))  ORDER BY p.createdAt DESC")
	List<Order> search(@Param("keyword") String keyword);
	

}
