package com.project.be.dto.response;

import com.project.be.common.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
  
  private String token;
  private Role role;
  private int id;
}
