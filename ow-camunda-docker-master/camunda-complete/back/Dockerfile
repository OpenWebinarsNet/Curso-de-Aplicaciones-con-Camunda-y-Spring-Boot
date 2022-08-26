FROM openjdk:15-jdk-alpine
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} app.jar
RUN mkdir -p /secret
COPY jwt.secret /secret/jwt.secret
ENTRYPOINT ["java","-jar","/app.jar"]
