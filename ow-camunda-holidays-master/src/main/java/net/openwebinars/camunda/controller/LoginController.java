package net.openwebinars.camunda.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;
import net.openwebinars.camunda.vo.LoginVO;
import net.openwebinars.camunda.vo.TokenVO;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.identity.Group;
import org.camunda.bpm.engine.identity.Tenant;
import org.camunda.bpm.engine.identity.User;
import org.codehaus.groovy.runtime.IOGroovyMethods;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

  private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);
  private final IdentityService identityService;
  @Value("${camunda.rest-api.jwt.secret-path}")
  private String jwtSecretPath;

  @Autowired
  public LoginController(IdentityService identityService) {
    this.identityService = identityService;
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  @ResponseBody
  public ResponseEntity<?> login(@Valid @RequestBody LoginVO payload) {

    boolean validUser = identityService.checkPassword(payload.getUser(), payload.getPassword());

    try (FileInputStream jwtSecret = new FileInputStream(jwtSecretPath)) {
      User user = identityService.createUserQuery().userId(payload.getUser()).singleResult();
      List<Group> groups = identityService.createGroupQuery().groupMember(payload.getUser()).list();
      List<Tenant> tenants = identityService.createTenantQuery().userMember(payload.getUser()).list();

      String jwtSecretString = IOGroovyMethods.getText(jwtSecret);

      if (validUser) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecretString);
        Calendar date = Calendar.getInstance();
        long timeInSecs = date.getTimeInMillis();
        // 1 mes, desarrollo
        Date expireDate = new Date(timeInSecs + (43800L * 60 * 1000));

        String token = JWT
            .create()
            .withIssuer("Camunda")
            .withClaim("username", user.getId())
            .withArrayClaim("groupIds", groups.stream().map(Group::getId).toArray(String[]::new))
            .withArrayClaim("tenantIds", tenants.stream().map(Tenant::getId).toArray(String[]::new))
            .withIssuedAt(new Date())
            .withExpiresAt(expireDate)
            .sign(algorithm);

        TokenVO tokenVO = new TokenVO(token);

        return ResponseEntity.ok(tokenVO);
      }
    } catch (IOException e) {
      LOG.error("Read JWT Secret error: " + e.getLocalizedMessage());
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }
}
