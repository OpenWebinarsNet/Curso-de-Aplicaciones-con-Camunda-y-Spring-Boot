package net.openwebinars.camunda.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import io.digitalstate.camunda.authentication.jwt.ValidatorResultJwt;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import net.openwebinars.camunda.config.ValidatorJwt;
import org.codehaus.groovy.runtime.IOGroovyMethods;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/refresh")
public class RefreshController {

  private static final Logger LOG = LoggerFactory.getLogger(RefreshController.class);
  private final ValidatorJwt validatorJwt;
  @Value("${camunda.rest-api.jwt.secret-path}")
  private String jwtSecretPath;


  @Autowired
  public RefreshController(ValidatorJwt validatorJwt) {
    this.validatorJwt = validatorJwt;
  }


  @GetMapping(produces = "application/json")
  @ResponseBody
  public ResponseEntity<?> refresh(@RequestHeader("Authorization") String headerToken) {

    ValidatorResultJwt validatedToken = validatorJwt.validateJwt(headerToken.substring(7), jwtSecretPath);

    if (validatedToken.getResult()) {

      try (FileInputStream jwtSecret = new FileInputStream(jwtSecretPath)) {

        String jwtSecretString = IOGroovyMethods.getText(jwtSecret);
        Algorithm algorithm = Algorithm.HMAC256(jwtSecretString);
        Calendar date = Calendar.getInstance();
        long timeInSecs = date.getTimeInMillis();
        Date expireDate = new Date(timeInSecs + (5 * 60 * 1000));

        String token = JWT
            .create()
            .withIssuer("Camunda")
            .withClaim("username", validatedToken.getAuthenticatedUsername())
            .withArrayClaim("groupIds", validatedToken.getGroupIds().toArray(new String[0]))
            .withArrayClaim("tenantIds", validatedToken.getTenantIds().toArray(new String[0]))
            .withIssuedAt(new Date())
            .withExpiresAt(expireDate)
            .sign(algorithm);

        return ResponseEntity.ok(token);

      } catch (IOException e) {
        LOG.error("Read JWT Secret error: " + e.getLocalizedMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
      }
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

}
