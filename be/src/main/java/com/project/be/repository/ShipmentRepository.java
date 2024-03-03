package com.project.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.be.model.Shipment;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {

}
