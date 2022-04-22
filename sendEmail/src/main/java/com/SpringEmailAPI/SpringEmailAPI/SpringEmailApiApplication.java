package com.SpringEmailAPI.SpringEmailAPI;

import com.SpringEmailAPI.SpringEmailAPI.controller.EmailController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import com.SpringEmailAPI.SpringEmailAPI.service.EmailSenderService;

@SpringBootApplication
public class SpringEmailApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringEmailApiApplication.class, args);
	}

}
