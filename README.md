# Desafio Suntech


**Candidato:** Renan Costa

**Contato:** renan.paiva@lavid.ufpb.br - (83) 99133-6770

**Data:** 17/11/2020

Este projeto foi desenvolvido como teste prático para candidatura ao cargo de desenvolvedor na SunTech.

  


## Execução

  

Para executar é necessário um banco de dados vazio no PostgreSQL.

modificar o arquivo src/main/resources/application.properties

  

  

    spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect
    
    spring.jpa.hibernate.ddl-auto=none
    
    spring.datasource.url=jdbc:postgresql://localhost:5432/{Banco_Vazio}
    
    spring.datasource.driver-class-name=org.postgresql.Driver
    
    spring.datasource.username={usuario}
    
    spring.datasource.password={senha}
    
    spring.jpa.generate-ddl=true
    
    spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true

Onde {Banco_vazio} é o nome do database criado, {usuario} e {senha} são o seu usuário e senha do Postgres

O hibernate criará o schema do banco de dados.

execute o seguinte comando na pasta /api do repositório `mvn spring-boot:run` ou abra o projeto pelo eclipse execute como aplicação Spring-Boot

Para iniciar a interface abra outro terminal, entre na pasta /front e execute os seguintes comandos
 `npm install`e em seguida`npm start`

A API estará rodando em `localhost:8080` e a interface em `localhost:3000`

## Deploy
A aplicação também pode ser executada utilizando Docker utilizando o comando `docker-compose up --build`
na pasta raiz do projeto onde o arquivo docker-compose.yml está localizado A API estará rodando em `localhost:8080` e a interface em `localhost`
