package net.openwebinars.camunda.vo;

import javax.validation.constraints.NotNull;

public class TokenVO {

  @NotNull
  private String token;

  public TokenVO(String token) {
    this.token = token;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
