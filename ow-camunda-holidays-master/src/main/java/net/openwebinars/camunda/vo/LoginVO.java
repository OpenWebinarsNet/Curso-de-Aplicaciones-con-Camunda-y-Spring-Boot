package net.openwebinars.camunda.vo;

import javax.validation.constraints.NotNull;

public class LoginVO {

  @NotNull
  private String user;

  @NotNull
  private String password;

  public String getUser() {
    return user;
  }

  public String getPassword() {
    return password;
  }
}
