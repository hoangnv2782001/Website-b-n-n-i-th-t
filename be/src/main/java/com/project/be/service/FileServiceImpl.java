package com.project.be.service;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FileServiceImpl implements FileService {

	private final Cloudinary cloudinary;

	@Override
	public String uploadFile(MultipartFile multipartFile) throws IOException {
		String fileName = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
		return cloudinary.uploader().upload(multipartFile.getBytes(), Map.of("public_id", fileName)).get("url")
				.toString();
	}

}
