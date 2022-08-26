package net.openwebinars.camunda;

import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

  public static void main(String... args) {
    SpringApplication.run(Application.class, args);
  }

  @Bean
  public static ProcessEnginePlugin myProcessEnginePluginConfiguration() {
    return new ConnectProcessEnginePlugin();
  }
}