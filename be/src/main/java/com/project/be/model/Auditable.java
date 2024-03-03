package com.project.be.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;
/**
 * Sử dụng tạo audit tracking và logging các thay đổi trong 
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
public class Auditable {

	@CreatedDate
	@Column(nullable = false)
	protected LocalDateTime createAt;

//	@CreatedBy
//	protected U createdBy;
//
//
//	@LastModifiedBy
//	protected U lastModifiedBy;
//
//	@LastModifiedDate
//	@Temporal(TIMESTAMP)
//	protected Date lastModifiedDate;

}
