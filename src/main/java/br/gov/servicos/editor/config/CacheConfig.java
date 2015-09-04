package br.gov.servicos.editor.config;

import br.gov.servicos.editor.cartas.Carta;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.guava.GuavaCacheManager;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        return new GuavaCacheManager();
    }

    @Bean
    public KeyGenerator geradorDeChavesParaCacheDeCommitsRecentes() {
        return (target, method, params) -> ((Carta) target).getId();
    }
}
