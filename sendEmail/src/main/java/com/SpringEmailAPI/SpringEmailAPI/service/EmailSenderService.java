package com.SpringEmailAPI.SpringEmailAPI.service;

import com.SpringEmailAPI.SpringEmailAPI.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(Email email){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("eduardoneress12@gmail.com");
        message.setTo(email.getSendTo());
        message.setText(email.getBody());
        message.setSubject(email.getSubject());
        mailSender.send(message);
        System.out.println("Mail send !");
    }

}
