package com.suntech.desafio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Desafio SunTech - 15/11/2020
 * Candidato: Renan Costa
 * Arquivo: Componente de iniciação do spring boot
 * 
 * Histórico de Alteraçôes:
 * - 15/11/2020 Renan Costa Criação
 */

@SpringBootApplication

public class DesafioApplication {

	public static void main(String[] args) {
		SpringApplication.run(DesafioApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "OPTIONS", "PUT", "DELETE").exposedHeaders( "Authorization" );
			}
		};
	}
}
