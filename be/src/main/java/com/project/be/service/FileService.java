package com.project.be.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService  {

	String uploadFile(MultipartFile file) throws IOException;

}
