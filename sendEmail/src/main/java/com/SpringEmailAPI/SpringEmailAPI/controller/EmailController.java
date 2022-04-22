package com.SpringEmailAPI.SpringEmailAPI.controller;

import com.SpringEmailAPI.SpringEmailAPI.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.SpringEmailAPI.SpringEmailAPI.model.Email;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailSenderService emailSenderService;
    @PostMapping(path = "/enviar")
    public void enviarEmail(@RequestBody Email email) {
        emailSenderService.sendEmail(email);
    }

}
