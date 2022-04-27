package com.SpringEmailAPI.SpringEmailAPI.controller;

import com.SpringEmailAPI.SpringEmailAPI.service.EmailSenderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.SpringEmailAPI.SpringEmailAPI.model.Email;

@RestController
@RequestMapping("/email")
//@Api(value="API REST Emails")
//@CrossOrigin(origins = "*")
public class EmailController {
    @Autowired
    private EmailSenderService emailSenderService;
    @PostMapping(path = "/enviar")
//    @ApiOperation(value="Enviar email")
    public void enviarEmail(@RequestBody Email email) {

        emailSenderService.sendEmail(email);
    }

    @GetMapping("/hello")
        public String hello(){
            return "Hello World";
        }

}
