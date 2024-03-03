package com.project.be.config;

import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.cloudinary.Cloudinary;

@Configuration
@EnableJpaAuditing
public class ConfigurationBean {
	
	@Value("${cloudinary.cloud-name}")
	private String cloud_name;
	
	@Value("${cloudinary.api-key}")
	private String api_key;
	
	@Value("${cloudinary.api-secret}")
	private String api_secret;
	
	
	
	@Bean
	public ModelMapper createModelMapper() {
		  ModelMapper modelMapper = new ModelMapper();
	        modelMapper.getConfiguration()
	                .setMatchingStrategy(MatchingStrategies.STRICT);
	        return modelMapper;
	}
	
	@Bean
	public Cloudinary cloudinaryConfig() {
		Map<String , String> config = new HashMap<>();
		
		config.put("cloud_name", cloud_name);
		
		config.put("api_key", api_key);
		
		config.put("api_secret", api_secret);
		
		return new Cloudinary(config);
	}

}
