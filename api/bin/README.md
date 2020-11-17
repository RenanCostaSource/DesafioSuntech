# Desafio loja de aluguel de livros - React

  

TESTE FRONTEND DIGIVOX  
---------------------------------------------  
**Candidato:** Renan Costa  
**Contato:** renan.paiva@lavid.ufpb.br - (83) 99133-6770  
**Data:** 19/10/2020  
  
Este projeto foi desenvolvido como teste prático para candidatura ao  
cargo de desenvolvedor na Digivox.  

## Oportunidade

  

Olá! Temos uma oportunidade de desenvolvedor na Digivox e gostaríamos que você participasse do nosso processo seletivo. Ao fim do processo, você receberá um feedback do nosso time com o resultado. 😃

  

## Detalhamento do desafio

  

Criar uma API REST para gerenciamento de uma loja que aluga livros. Através destes serviços a empresa poderá manter o cadastro dos livros, clientes, aluguéis e acompanhar em um dashboard o que está sendo devolvido e alugado em tempo real.

  

## Serviços a serem criados:

  

- Manter livro;

- Manter cliente;

- Reservar de livro;

- Cancelar reserva;

- Alugar livro;

- Devolução de livro;

- Dashboard com informações sobre:

- Livros a serem devolvidos no período semanal, com seus valores;

- Livros alugados no período semanal, com seus valores;

  

OBS: Para o serviço de reserva, o livro será disponibilizado ao cliente em uma data agendada (ou seja, um agendamento) enquanto no de aluguel do livro ele é disponibilizado no exato momento da solicitação.

  

## Tecnologias Desejáveis

  

- JDK 1.8+;

- Maven 3.3+;

- Banco de dados Postgres;

- Framework Spring Boot;

- React

OBS: Sinta-se à vontade para utilizar outras tecnologias.

  

## O que avaliaremos

  

- Coesão do código-fonte

- Boas práticas e padrões;

- Aderência aos serviços solicitados;

  

## Instruções

  

1. Após o envio do desafio você terá 5 dias para desenvolver. Seja criativo! Utilize as ferramentas e frameworks ao seu favor.

2. Atualize o README.MD do projeto e detalhe as etapas para que a aplicação execute com sucesso.

3. Após finalizado envie um e-mail para dev-challenges@digivox.com.br, informando onde o projeto está hospedado.

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


execute o seguinte comando na pasta raiz do repositório   `mvn spring-boot:run` ou abra o projeto pelo eclipse execute como aplicação Spring-Boot
Para iniciar a interface abra outro terminal, entre na pasta /aluguelfront e execute os seguintes comandos

    npm  install
e em seguida

    npm start
A API estará rodando em `localhost:8080` e a interface em `localhost:3000`