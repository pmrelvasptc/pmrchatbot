package com.pmrelvas.pmrchatbot.controller;

import com.pmrelvas.pmrchatbot.model.Greeting;
import com.pmrelvas.pmrchatbot.model.Message;
import lombok.extern.slf4j.Slf4j;
import org.alicebot.ab.Bot;
import org.alicebot.ab.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class MessageController {

    private final Bot jaquimBot;
    private final Chat chatSession;

    @Autowired
    public MessageController(Bot jaquimBot) {
        this.jaquimBot = jaquimBot;
        this.chatSession = new Chat(jaquimBot);
    }

    @MessageMapping("/chatBot")
    @SendToUser
    public Greeting register(Message message) {
        log.info("Generating new greeting for " + message);
        return Greeting.builder()
                .content(chatSession.multisentenceRespond(message.getContent()))
                .build();
    }
}
