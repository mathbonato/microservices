package com.SpringEmailAPI.SpringEmailAPI;

import com.SpringEmailAPI.SpringEmailAPI.controller.EmailController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import com.SpringEmailAPI.SpringEmailAPI.service.EmailSenderService;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class SpringEmailApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringEmailApiApplication.class, args);
	}

}
