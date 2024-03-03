package com.project.be.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.be.dto.response.Image;
import com.project.be.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/files")
public class FileController {
	private final FileService fileService;
	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@PostMapping
	public ResponseEntity<?> upload(@RequestParam MultipartFile file) throws IOException {
		return new ResponseEntity(Image.builder().img(fileService.uploadFile(file)).build(), HttpStatus.OK);
	}
}
