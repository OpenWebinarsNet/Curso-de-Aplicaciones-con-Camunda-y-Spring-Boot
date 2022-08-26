package net.openwebinars.camunda.vo;

public class RoleVO {

  private String id;
  private String desc;

  public RoleVO(String id, String desc) {
    this.id = id;
    this.desc = desc;
  }

  public String getId() {
    return id;
  }

  public String getDesc() {
    return desc;
  }
}
