# ShortMe 

ShortMe é um encurtador de URLs criado com o framework NestJS e o ORM Prisma. Este projeto foi criado como um desafio inspirado em outros repositórios que vi na comunidade, como uma forma de aplicar meus conhecimentos em desenvolvimento de APIs RESTful com NestJS e Prisma.

## Funcionamento
O funcionamento do ShortMe é simples: o usuário informa a URL que deseja encurtar e o sistema retorna uma URL mais curta, que redireciona o usuário para a URL original.

Além disso, o sistema possui uma funcionalidade de expiração de URLs encurtadas, onde as URLs expiram automaticamente após um período pré-definido, garantindo maior segurança e controle das URLs encurtadas.

O projeto também conta com testes automatizados, garantindo maior qualidade e confiabilidade no desenvolvimento e manutenção do sistema.

Para acessar a versão em produção da API ShortMe, basta clicar no link a seguir: https://shortme-production.up.railway.app

## Tecnologias utilizadas
O ShortMe foi desenvolvido com as seguintes tecnologias:

[![My Skills](https://skillicons.dev/icons?i=typescript,nestjs,prisma,jest)](https://skillicons.dev)
<img src="https://static-00.iconduck.com/assets.00/swagger-icon-512x512-halz44im.png" alt="Descrição da Imagem" width="50" height="50" style="border-radius: 20px">

## Executando o projeto localmente
Para executar o projeto localmente, siga os passos abaixo:

 1 - Clone o repositório do projeto:
```
$ git clone https://github.com/WiliamMelo01/ShortMe.git 
``` 
2 - Instale as dependências do projeto:
```
cd shortme
npm install
``` 
3 - Inicie o servidor de desenvolvimento:
```
npm run start:dev
```
4 - Acesse o aplicativo em http://localhost:3000.

## Testes
Para executar os testes do projeto, basta executar o comando:

```
npm run test
```

## Documentação da API

A documentação completa da API está disponível na rota `/doc`.

Para acessar a documentação da API, basta iniciar a aplicação e acessar a rota em um navegador web:


A documentação é gerada automaticamente a partir dos arquivos de código fonte da aplicação, utilizando a biblioteca Swagger UI.


## Contribuindo
Contribuições são sempre bem-vindas! Caso queira contribuir para o projeto, basta seguir os seguintes passos:

1 - Faça um fork do projeto.

2 - Crie um branch para a sua feature (git checkout -b minha-feature).

3 - Implemente a sua feature e adicione testes para ela.

4 - Commite as suas mudanças (git commit -m 'Adiciona minha feature').

5 - Envie o código para o seu fork (git push origin minha-feature).

6 - Abra um pull request no repositório original e aguarde a revisão do seu código.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.


