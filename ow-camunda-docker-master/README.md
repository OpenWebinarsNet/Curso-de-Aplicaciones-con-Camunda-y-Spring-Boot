# OpenWebinars Camunda

## camunda-complete

Estructura Docker y Docker Compose para desplegar aplicaciones con Camunda Spring Boot y Angular

```bash
cd camunda-camunda/back

docker build -t camunda-back .

cd ../front

docker build -t camunda-front .

cd ..

docker-compose up

docker-compose up -d # Ejecutar en segundo plano
```

## postgres-camunda

Estructura Docker Compose para levantar una base de datos de desarrollo y otra de test para conectar con Camunda.

```bash
cd postgres-camunda

docker-compose up

docker-compose up -d # Ejecutar en segundo plano
```
