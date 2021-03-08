package com.pmrelvas.pmrchatbot.controller;

import com.pmrelvas.pmrchatbot.model.MessageResponse;
import com.pmrelvas.pmrchatbot.model.MessageRequest;
import lombok.extern.slf4j.Slf4j;
import org.alicebot.ab.Bot;
import org.alicebot.ab.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class MessageController {

    private final Bot jaquimBot;
    private final Chat chatSession;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public MessageController(Bot jaquimBot, SimpMessagingTemplate simpMessagingTemplate) {
        this.jaquimBot = jaquimBot;
        this.chatSession = new Chat(jaquimBot);
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/chatBot")
    @SendToUser
    public MessageResponse register(MessageRequest message) {
        log.info("Generating new greeting for " + message);
        return MessageResponse.builder()
                .content(chatSession.multisentenceRespond(message.getContent()))
                .build();
    }
}
