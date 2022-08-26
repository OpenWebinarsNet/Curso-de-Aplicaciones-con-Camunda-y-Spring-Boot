package net.openwebinars.camunda.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.digitalstate.camunda.authentication.jwt.AbstractValidatorJwt;
import io.digitalstate.camunda.authentication.jwt.ValidatorResultJwt;
import java.io.FileInputStream;
import java.util.Date;
import java.util.List;
import org.codehaus.groovy.runtime.IOGroovyMethods;
import org.codehaus.groovy.runtime.StringGroovyMethods;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Component
public class ValidatorJwt extends AbstractValidatorJwt {

  private static final Logger LOG = LoggerFactory.getLogger(ValidatorJwt.class);
  private static String jwtSecret;

  @Override
  public ValidatorResultJwt validateJwt(String encodedCredentials, String jwtSecretPath) {
    if (!StringGroovyMethods.asBoolean(jwtSecret)) {
      try {
        jwtSecret = IOGroovyMethods.getText(new FileInputStream(jwtSecretPath));
      } catch (Exception all) {
        LOG.error("ERROR: Unable to load JWT Secret: " + all.getLocalizedMessage());
        return ValidatorResultJwt.setValidatorResult(false, null, null, null);
      }

    }

    try {
      Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
      JWTVerifier verifier = JWT.require(algorithm).acceptNotBefore(new Date().getTime()).build();
      DecodedJWT jwt = verifier.verify(encodedCredentials);

      String username = jwt.getClaim("username").asString();
      List<String> groupIds = jwt.getClaim("groupIds").asList(String.class);
      List<String> tenantIds = jwt.getClaim("tenantIds").asList(String.class);

      if (!StringGroovyMethods.asBoolean(username)) {
        LOG.warn("BAD JWT: Missing username");
        return ValidatorResultJwt.setValidatorResult(false, null, null, null);
      }

      return ValidatorResultJwt.setValidatorResult(true, username, groupIds, tenantIds);

    } catch (JWTVerificationException exception) {
      LOG.warn("BAD JWT: " + exception.getLocalizedMessage());
      return ValidatorResultJwt.setValidatorResult(false, null, null, null);
    }

  }
}
