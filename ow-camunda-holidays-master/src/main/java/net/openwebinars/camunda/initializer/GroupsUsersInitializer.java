package net.openwebinars.camunda.initializer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import javax.annotation.PostConstruct;
import net.openwebinars.camunda.vo.RoleVO;
import org.camunda.bpm.engine.AuthorizationService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.authorization.Authorization;
import org.camunda.bpm.engine.authorization.Permissions;
import org.camunda.bpm.engine.authorization.Resources;
import org.camunda.bpm.engine.identity.Group;
import org.camunda.bpm.engine.identity.User;
import org.camunda.bpm.engine.impl.persistence.entity.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

@Component
public class GroupsUsersInitializer {

  private final AuthorizationService authorizationService;
  private final IdentityService identityService;
  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
  @Value(value = "${camunda.initializer.populate}")
  private Resource usersCSV;

  @Autowired
  public GroupsUsersInitializer(
      AuthorizationService authorizationService, IdentityService identityService) {
    this.authorizationService = authorizationService;
    this.identityService = identityService;
  }

  @PostConstruct
  public void processGroups() throws IOException {
    ArrayList<RoleVO> roles = new ArrayList<>();

    roles.add(new RoleVO("development", "Desarrollo"));
    roles.add(new RoleVO("sales", "Ventas"));
    roles.add(new RoleVO("hr", "Recursos humanos"));
    roles.add(new RoleVO("mkt", "Marketing"));
    roles.add(new RoleVO("bi", "Business Intelligence"));
    roles.add(new RoleVO("idi", "I + D + i"));
    roles.add(new RoleVO("user", "Usuarios APP Web"));

    roles.forEach(role -> {
      Group camundaRole = identityService.createGroupQuery().groupId(role.getId()).singleResult();

      if (camundaRole == null) {
        camundaRole = identityService.newGroup(role.getId());
      }

      camundaRole.setName(role.getDesc());
      camundaRole.setType("Initializer role");

      identityService.saveGroup(camundaRole);
      manageGroup(camundaRole.getId());
    });

    processUsers();
  }

  private void manageGroup(String id) {
    int auth = Authorization.AUTH_TYPE_GRANT;
    Permissions permRead = Permissions.READ;
    Permissions perC = Permissions.CREATE;
    Permissions perCI = Permissions.CREATE_INSTANCE;
    Permissions perRI = Permissions.READ_INSTANCE;
    Permissions perH = Permissions.READ_HISTORY;
    manageAuth(id, auth, permRead, Resources.PROCESS_DEFINITION, "holidayRequest");
    manageAuth(id, auth, perCI, Resources.PROCESS_DEFINITION, "holidayRequest");
    manageAuth(id, auth, perRI, Resources.PROCESS_DEFINITION, "holidayRequest");
    manageAuth(id, auth, perH, Resources.PROCESS_DEFINITION, "holidayRequest");
    manageAuth(id, auth, perC, Resources.PROCESS_INSTANCE, null);
    manageAuth(id, auth, permRead, Resources.USER, null);
  }

  private void manageAuth(
      String id, int authType, Permissions permission, Resources resource, String resourceId) {
    resourceId = resourceId == null ? "*" : resourceId;
    Authorization authorization = authorizationService
        .createAuthorizationQuery()
        .groupIdIn(id)
        .authorizationType(authType)
        .resourceType(resource)
        .resourceId(resourceId)
        .singleResult();

    if (authorization == null) {
      authorization = authorizationService.createNewAuthorization(authType);
      authorization.setPermissions(new Permissions[]{permission});
      authorization.setResource(resource);
      authorization.setGroupId(id);
      authorization.setResourceId(resourceId);

    } else {
      if (!authorization.isPermissionGranted(permission)) {
        authorization.addPermission(permission);
      }
    }
    authorizationService.saveAuthorization(authorization);
  }

  private void processUsers() throws IOException {
    ArrayList<UserEntity> users = new ArrayList<>();

    try (
        BufferedReader br = new BufferedReader(new InputStreamReader(
            usersCSV.getInputStream(),
            StandardCharsets.UTF_8))) {
      String line;
      while ((line = br.readLine()) != null) {
        String[] values = line.split(";");
        UserEntity user = new UserEntity();
        user.setId(values[0]);
        user.setFirstName(values[1]);
        user.setLastName(values[2]);
        user.setDbPassword(values[3]);
        user.setEmail(values[4]);

        users.add(user);
      }
    }

    users.forEach(user -> {
      User camundaUser = identityService.createUserQuery().userId(user.getId()).singleResult();

      if (camundaUser == null) {
        camundaUser = identityService.newUser(user.getId());

        camundaUser.setFirstName(user.getFirstName());
        camundaUser.setLastName(user.getLastName());
        camundaUser.setEmail(user.getEmail());
        camundaUser.setPassword(user.getPassword());

        identityService.saveUser(camundaUser);

        if ("alopez".equals(camundaUser.getId()) || "demo".equals(camundaUser.getId())) {
          identityService.createMembership(camundaUser.getId(), "development");
        }

        if ("mjimenez".equals(camundaUser.getId())) {
          identityService.createMembership(camundaUser.getId(), "sales");
        }

        if ("jortelli".equals(camundaUser.getId())) {
          identityService.createMembership(camundaUser.getId(), "hr");
        }

        if ("lcampos".equals(camundaUser.getId())) {
          identityService.createMembership(camundaUser.getId(), "mkt");
        }

        if ("tmoreno".equals(camundaUser.getId())) {
          identityService.createMembership(camundaUser.getId(), "bi");
        }

        if ("aneira".equals(camundaUser.getId())) {
          identityService.createMembership(camundaUser.getId(), "idi");
        }

        identityService.createMembership(camundaUser.getId(), "user");
      }
    });
  }
}
