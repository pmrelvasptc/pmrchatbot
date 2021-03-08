package com.pmrelvas.pmrchatbot.config;

import org.alicebot.ab.Bot;
import org.alicebot.ab.configuration.BotConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class BotsConfiguration {

    @Bean
    public Bot jaquimBot() {
        return new Bot(BotConfiguration.builder()
                .name("alice")
                .path("src/main/resources")
                .build());
    }
}
