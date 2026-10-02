# Documentação final — Histórias de usuário, casos de teste e execução do projeto

**Projeto:** TCC-EBAC-QE  
**Autor:** Pedro Ricardo Belo de Sá  
**Repositório:** https://github.com/Pedro001979/TCC-EBAC-QE  
**Data de consolidação:** 02/10/2026

---

## 1. Objetivo desta documentação

Este documento consolida as histórias de usuário, critérios de aceitação, casos de teste e a descrição técnica das principais frentes implementadas no projeto.

A estrutura segue o enunciado do trabalho de conclusão: histórias de usuário, critérios em Gherkin, casos positivos/alternativos/negativos, identificação dos casos automatizados, automação Web, API, Mobile, integração contínua e testes de performance.

> **Nota de rastreabilidade:** as US-0001, US-0002, US-0003 e US-0004 possuem evidências de automação no repositório. As US-0005, US-0006, US-0007 e US-0008 são documentadas abaixo como requisitos e casos de teste; nesta versão do repositório não foram localizados scripts específicos de automação Web para essas quatro histórias. Portanto, elas não são apresentadas como automatizadas.

---

# 2. Histórias de usuário e critérios de aceitação

## 2.1 US-0001 — Adicionar item ao carrinho

**História:**  
Como cliente, quero adicionar produtos ao carrinho para realizar uma compra.

### Critérios de aceitação

**Cenário 01 — Adicionar produto disponível**

**Dado** que o cliente esteja na página de produtos  
**E** exista um produto disponível para compra  
**Quando** o cliente adicionar o produto ao carrinho  
**Então** o produto deve ser adicionado ao carrinho.

**Cenário 02 — Alterar quantidade**

**Dado** que o cliente tenha um produto no carrinho  
**Quando** alterar a quantidade do produto  
**Então** a quantidade deve ser atualizada  
**E** o valor do carrinho deve ser recalculado.

**Cenário 03 — Remover produto**

**Dado** que o cliente tenha um produto no carrinho  
**Quando** remover o produto  
**Então** o produto não deve mais ser exibido no carrinho.

**Cenário 04 — Carrinho vazio**

**Dado** que o cliente não possua produtos adicionados  
**Quando** acessar o carrinho  
**Então** o sistema deve informar que o carrinho está vazio.

### Casos relacionados no projeto

- Fluxo completo de compra no Cypress.
- CT-009 — limite de 10 unidades do mesmo produto.
- CT-010 — limite de subtotal.
- CT-011 — desconto de 10%.
- CT-012 — desconto de 15%.

---

## 2.2 US-0002 — Login na plataforma

**História:**  
Como cliente da EBAC Shop, quero realizar login para visualizar e utilizar minha conta.

### Critérios de aceitação

**Cenário 01 — Login válido**

**Dado** que o cliente esteja na página de login  
**E** possua credenciais válidas  
**Quando** informar usuário e senha corretamente  
**E** realizar o login  
**Então** o sistema deve permitir o acesso à conta.

**Cenário 02 — Senha inválida**

**Dado** que o cliente esteja na página de login  
**E** informe um usuário válido  
**Quando** informar uma senha inválida  
**E** realizar o login  
**Então** o sistema deve impedir o acesso  
**E** apresentar uma mensagem de erro.

**Cenário 03 — Usuário não informado**

**Dado** que o cliente esteja na página de login  
**Quando** informar apenas a senha  
**E** realizar o login  
**Então** o sistema deve solicitar o preenchimento do usuário.

**Cenário 04 — Senha não informada**

**Dado** que o cliente esteja na página de login  
**Quando** informar apenas o usuário  
**E** realizar o login  
**Então** o sistema deve solicitar o preenchimento da senha.

### Automação

A automação está em `UI/cypress/e2e/login.cy.js`, utilizando Page Object.

- CT-005 — login com credenciais válidas.
- CT-006 — senha inválida.
- CT-007 — usuário vazio.
- CT-008 — senha vazia.

---

## 2.3 US-0003 — API de cupons

**História:**  
Como cliente/sistema consumidor da EBAC Shop, quero consultar e administrar cupons pela API para validar as regras de descontos.

### Critérios de aceitação

**Cenário 01 — Consultar cupom válido**

**Dado** que exista um cupom válido cadastrado  
**Quando** a API receber uma requisição para consultar o cupom  
**Então** deve retornar uma resposta de sucesso  
**E** deve apresentar os dados do cupom.

**Cenário 02 — Consultar cupom inexistente**

**Dado** que o cupom informado não esteja cadastrado  
**Quando** a API receber uma requisição para consultar o cupom  
**Então** deve retornar uma resposta indicando que o cupom não foi encontrado.

**Cenário 03 — Dados inválidos**

**Dado** que os dados enviados para a API sejam inválidos  
**Quando** a requisição for realizada  
**Então** a API deve retornar uma resposta de erro.

**Cenário 04 — Contrato da API**

**Dado** que a API processe uma requisição válida  
**Quando** a resposta for retornada  
**Então** a resposta deve possuir a estrutura esperada  
**E** os campos obrigatórios devem estar presentes.

### Automação existente

O arquivo `API/coupons.test.js` utiliza Node.js `node:test` e Supertest.

A suíte atual cobre:

- listagem de cupons;
- criação de cupom com código único;
- consulta de cupom por ID;
- rejeição de código duplicado;
- remoção do cupom criado ao final da execução;
- validações de status e campos principais da resposta.

As credenciais ficam fora do código e são carregadas por variáveis de ambiente.

---

# 3. Histórias que faltavam

## 3.1 US-0004 — Catálogo de Produtos

**História:**  
Como cliente, quero visualizar o catálogo de produtos para consultar os produtos disponíveis para compra.

### Critérios de aceitação

**Cenário 01 — Visualizar catálogo**

**Dado** que o cliente acesse a loja  
**Quando** abrir a área de catálogo  
**Então** o sistema deve apresentar produtos disponíveis para consulta.

**Cenário 02 — Visualizar detalhes de produto**

**Dado** que exista um produto disponível no catálogo  
**Quando** o cliente selecionar o produto  
**Então** o sistema deve apresentar os detalhes do produto  
**E** deve disponibilizar a opção de adicionar o produto ao carrinho.

**Cenário 03 — Pesquisar produto existente**

**Dado** que o catálogo possua um produto conhecido  
**Quando** o cliente pesquisar pelo nome do produto  
**Então** devem ser apresentados resultados correspondentes à pesquisa.

**Cenário 04 — Pesquisar produto inexistente**

**Dado** que o catálogo esteja disponível  
**Quando** o cliente pesquisar por um produto que não existe  
**Então** o sistema não deve apresentar produtos correspondentes  
**E** ao limpar a pesquisa o catálogo deve voltar a apresentar produtos.

### Automação existente

Esta história possui automação Mobile Android no arquivo `Mobile/test/specs/catalog.spec.js`.

Casos:

- CT-MOB-001 — abertura da loja e navegação principal.
- CT-MOB-002 — produtos no catálogo.
- CT-MOB-003 — abertura dos detalhes.
- CT-MOB-004 — retorno dos detalhes ao catálogo.
- CT-MOB-005 — pesquisa de produto existente.
- CT-MOB-006 — pesquisa sem correspondência.
- CT-MOB-007 — ordenação crescente por preço.

O Mobile utiliza Page Object Model e Allure para geração de relatório.

---

## 3.2 US-0005 — Minha Conta

**História:**  
Como cliente, quero acessar o painel Minha Conta para consultar e gerenciar as informações relacionadas à minha conta.

### Critérios de aceitação

**Cenário 01 — Acessar Minha Conta autenticado**

**Dado** que o cliente possua uma conta válida  
**E** esteja autenticado  
**Quando** acessar a área Minha Conta  
**Então** o painel da conta deve ser apresentado.

**Cenário 02 — Visualizar opções do painel**

**Dado** que o cliente esteja autenticado  
**Quando** acessar Minha Conta  
**Então** o sistema deve apresentar as opções disponíveis para gerenciamento da conta.

**Cenário 03 — Acessar Minha Conta sem autenticação**

**Dado** que o cliente não esteja autenticado  
**Quando** tentar acessar uma área restrita da conta  
**Então** o sistema deve solicitar autenticação ou impedir o acesso ao conteúdo restrito.

**Cenário 04 — Navegar entre áreas da conta**

**Dado** que o cliente esteja autenticado  
**Quando** selecionar uma das opções disponíveis no painel  
**Então** o sistema deve direcioná-lo para a área correspondente.

### Casos de teste

| ID | Cenário | Tipo | Técnica | Automação |
|---|---|---|---|---|
| CT-013 | Acessar Minha Conta com usuário válido | Positivo | Partição de equivalência | Não localizada |
| CT-014 | Visualizar opções do painel | Positivo | Partição de equivalência | Não localizada |
| CT-015 | Tentar acessar área restrita sem login | Negativo | Partição de equivalência | Não localizada |
| CT-016 | Navegar para uma opção do painel | Alternativo | Teste de fluxo | Não localizada |

---

## 3.3 US-0006 — Meus Pedidos

**História:**  
Como cliente, quero visualizar meus pedidos para acompanhar o histórico das minhas compras.

### Critérios de aceitação

**Cenário 01 — Visualizar pedidos**

**Dado** que o cliente esteja autenticado  
**E** possua pedidos cadastrados  
**Quando** acessar Meus Pedidos  
**Então** o sistema deve apresentar o histórico de pedidos.

**Cenário 02 — Visualizar detalhes de um pedido**

**Dado** que exista um pedido no histórico  
**Quando** o cliente selecionar o pedido  
**Então** o sistema deve apresentar os detalhes correspondentes.

**Cenário 03 — Cliente sem pedidos**

**Dado** que o cliente esteja autenticado  
**E** não possua pedidos cadastrados  
**Quando** acessar Meus Pedidos  
**Então** o sistema deve informar que não existem pedidos para apresentar.

**Cenário 04 — Acesso sem autenticação**

**Dado** que o cliente não esteja autenticado  
**Quando** tentar acessar Meus Pedidos  
**Então** o sistema deve solicitar autenticação ou impedir o acesso.

### Casos de teste

| ID | Cenário | Tipo | Técnica | Automação |
|---|---|---|---|---|
| CT-017 | Visualizar histórico com pedidos | Positivo | Partição de equivalência | Não localizada |
| CT-018 | Abrir detalhes de pedido existente | Positivo | Teste de fluxo | Não localizada |
| CT-019 | Visualizar histórico sem pedidos | Negativo | Partição de equivalência | Não localizada |
| CT-020 | Acessar pedidos sem autenticação | Negativo | Partição de equivalência | Não localizada |

---

## 3.4 US-0007 — Endereços

**História:**  
Como cliente, quero cadastrar e gerenciar meus endereços para utilizá-los durante minhas compras.

### Critérios de aceitação

**Cenário 01 — Cadastrar endereço válido**

**Dado** que o cliente esteja autenticado  
**Quando** informar os dados obrigatórios de um endereço válido  
**E** salvar o cadastro  
**Então** o endereço deve ser salvo e apresentado na conta.

**Cenário 02 — Editar endereço**

**Dado** que exista um endereço cadastrado  
**Quando** o cliente alterar seus dados  
**E** salvar a alteração  
**Então** o sistema deve apresentar os dados atualizados.

**Cenário 03 — Dados obrigatórios não informados**

**Dado** que o cliente esteja cadastrando um endereço  
**Quando** deixar um campo obrigatório vazio  
**E** tentar salvar  
**Então** o sistema deve impedir o cadastro  
**E** informar o campo que precisa ser preenchido.

**Cenário 04 — Remover endereço**

**Dado** que o cliente possua um endereço cadastrado  
**Quando** solicitar sua remoção  
**Então** o endereço não deve mais aparecer como endereço cadastrado.

### Casos de teste

| ID | Cenário | Tipo | Técnica | Automação |
|---|---|---|---|---|
| CT-021 | Cadastrar endereço válido | Positivo | Partição de equivalência | Não localizada |
| CT-022 | Alterar endereço existente | Alternativo | Teste de fluxo | Não localizada |
| CT-023 | Cadastrar endereço sem campo obrigatório | Negativo | Valor limite/partição | Não localizada |
| CT-024 | Remover endereço existente | Alternativo | Teste de fluxo | Não localizada |

---

## 3.5 US-0008 — Detalhes da Conta

**História:**  
Como cliente, quero consultar e atualizar os detalhes da minha conta para manter meus dados pessoais atualizados.

### Critérios de aceitação

**Cenário 01 — Consultar dados da conta**

**Dado** que o cliente esteja autenticado  
**Quando** acessar os detalhes da conta  
**Então** o sistema deve apresentar os dados cadastrados.

**Cenário 02 — Atualizar dados válidos**

**Dado** que o cliente esteja na área de detalhes da conta  
**Quando** alterar dados permitidos com valores válidos  
**E** salvar as alterações  
**Então** o sistema deve confirmar a atualização  
**E** apresentar os dados atualizados.

**Cenário 03 — Informar dado obrigatório inválido**

**Dado** que o cliente esteja alterando seus dados  
**Quando** informar um valor inválido em um campo obrigatório  
**E** tentar salvar  
**Então** o sistema deve impedir a atualização  
**E** apresentar uma mensagem de validação.

**Cenário 04 — Acesso sem autenticação**

**Dado** que o cliente não esteja autenticado  
**Quando** tentar acessar os detalhes da conta  
**Então** o sistema deve solicitar autenticação ou impedir o acesso.

### Casos de teste

| ID | Cenário | Tipo | Técnica | Automação |
|---|---|---|---|---|
| CT-025 | Consultar dados cadastrados | Positivo | Partição de equivalência | Não localizada |
| CT-026 | Atualizar dados válidos | Positivo | Teste de fluxo | Não localizada |
| CT-027 | Atualizar campo obrigatório com valor inválido | Negativo | Partição de equivalência | Não localizada |
| CT-028 | Acessar detalhes sem autenticação | Negativo | Partição de equivalência | Não localizada |

---

# 4. Matriz consolidada de casos de teste

O projeto passa a ter uma matriz documental com **28 casos identificados neste documento**, além dos casos complementares já existentes no código.

| História | Casos principais | Automação existente |
|---|---|---|
| US-0001 | CT-001 a CT-004 + CT-009 a CT-012 | Cypress |
| US-0002 | CT-005 a CT-008 | Cypress |
| US-0003 | Casos API da suíte de cupons | Supertest |
| US-0004 | CT-MOB-001 a CT-MOB-007 | Appium/WebdriverIO |
| US-0005 | CT-013 a CT-016 | Não localizada |
| US-0006 | CT-017 a CT-020 | Não localizada |
| US-0007 | CT-021 a CT-024 | Não localizada |
| US-0008 | CT-025 a CT-028 | Não localizada |

Os casos US-0005 a US-0008 devem ser tratados no documento como casos definidos para a estratégia de teste. Eles não devem ser apresentados como executados automaticamente enquanto não houver evidência de execução correspondente no repositório.

---

# 5. Descrição técnica do projeto

## 5.1 Estratégia geral de testes

O projeto foi estruturado para avaliar diferentes camadas da aplicação:

- **Web/UI:** comportamento da loja pelo navegador.
- **API:** comportamento dos endpoints de cupons.
- **Mobile:** catálogo do aplicativo EBAC Store Android.
- **Performance:** comportamento do fluxo de autenticação sob carga.
- **Integração contínua:** execução automatizada dos testes por GitHub Actions.

A separação por camadas facilita a manutenção dos testes e permite analisar problemas de interface, serviço, aplicativo mobile e desempenho de forma independente.

---

# 6. Automação de UI — Cypress

## O que foi feito

Foi criado um projeto de automação Web utilizando **Cypress com JavaScript**.

A automação contempla:

### Login

Foram automatizados:

- login com credenciais válidas;
- tentativa de login com senha inválida;
- tentativa sem usuário;
- tentativa sem senha.

Os testes estão em:

`UI/cypress/e2e/login.cy.js`

### Fluxo de compra

Foi implementado um fluxo de compra que:

1. realiza autenticação;
2. acessa os produtos;
3. adiciona produtos ao carrinho;
4. abre o checkout;
5. preenche os dados de compra;
6. finaliza o pedido;
7. valida a mensagem de pedido recebido.

Os dados de checkout são gerados com **Faker**, evitando depender de dados pessoais fixos.

### Regras adicionais do carrinho

Também foram implementados cenários para:

- limite de quantidade por produto;
- limite de subtotal;
- desconto de 10%;
- desconto de 15%.

Nos testes de desconto, o Cypress utiliza a API REST para criar um cupom temporário, executa o cenário e remove o cupom criado ao final.

## Testing Pattern

Foi utilizado **Page Object Model (POM)**.

Os Page Objects concentram:

- seletores;
- ações de login;
- navegação;
- pesquisa de produtos;
- inclusão no carrinho;
- checkout;
- validações.

Isso reduz duplicação e deixa os cenários de teste mais próximos da linguagem de negócio.

---

# 7. Automação de API — Supertest

## O que foi feito

A automação da API foi implementada em:

`API/coupons.test.js`

Utiliza:

- Node.js;
- `node:test`;
- Supertest;
- variáveis de ambiente para credenciais.

A suíte valida:

1. listagem de cupons;
2. criação de cupom;
3. consulta por ID;
4. rejeição de cupom duplicado;
5. remoção do cupom criado.

Também são verificadas informações da resposta, como:

- ID;
- código;
- valor;
- tipo de desconto;
- descrição;
- status HTTP.

## Segurança das credenciais

As credenciais não são colocadas diretamente no código.

O projeto utiliza variáveis como:

`EBAC_API_USERNAME`  
`EBAC_API_PASSWORD`  
`EBAC_API_AUTHORIZATION`

O arquivo de ambiente local é ignorado pelo Git.

---

# 8. Automação Mobile — Appium + WebdriverIO

## O que foi feito

A automação Mobile foi direcionada exclusivamente ao **Catálogo de Produtos**, conforme solicitado no trabalho.

A implementação utiliza:

- Appium;
- WebdriverIO;
- Mocha;
- Android;
- Page Object Model;
- Allure.

A suíte está em:

`Mobile/test/specs/catalog.spec.js`

## Cenários automatizados

Foram implementados sete casos:

- abertura da loja;
- apresentação dos produtos;
- abertura dos detalhes;
- retorno ao catálogo;
- busca de produto existente;
- busca sem correspondência;
- ordenação crescente por preço.

## Page Objects

Foram separados objetos para:

- Home;
- Catálogo;
- Detalhes do produto.

A ideia é manter os seletores e ações fora dos cenários, facilitando manutenção.

## Relatório

O projeto utiliza **Allure** para gerar evidências dos testes Mobile.

O workflow também publica os resultados como artefatos do GitHub Actions.

---

# 9. Integração contínua — GitHub Actions

## Mobile

O arquivo:

`.github/workflows/mobile-android.yml`

automatiza o processo de:

1. checkout do projeto;
2. instalação das dependências;
3. preparação do ambiente Java;
4. preparação do emulador Android;
5. execução do Appium;
6. execução dos testes;
7. geração do relatório Allure;
8. publicação dos artefatos.

O workflow é executado em push, pull request para `main` e manualmente.

## Web e API

O arquivo:

`.github/workflows/manual-web-api.yml`

permite selecionar manualmente:

- execução do Cypress Web;
- execução dos testes de API.

As credenciais da API são obtidas por GitHub Secrets.

Isso evita colocar credenciais diretamente no YAML ou no código-fonte.

---

# 10. Testes de performance — K6

## O que foi feito

A automação de performance está em:

`performance/ebac-auth.js`

O teste utiliza o **K6** e trabalha com dois cenários:

### Cenário 1 — Login válido

Utiliza usuários de teste e executa o fluxo de autenticação com a senha correta.

### Cenário 2 — Login com senha inválida

Utiliza os mesmos usuários, porém envia uma senha propositalmente inválida.

## Configuração

O script utiliza:

- 20 VUs no conjunto dos dois cenários;
- ramp-up de 20 segundos;
- 100 segundos adicionais em carga;
- aproximadamente 2 minutos de execução da carga;
- cinco contas de teste;
- URL configurável por variável de ambiente.

O comando da raiz é:

```bash
npm run test:performance
```

Também pode ser executado diretamente:

```bash
k6 run performance/ebac-auth.js
```

## Resultado registrado

A documentação atual do projeto registra uma execução com:

- 297 iterações concluídas;
- 0 interrompidas;
- `http_req_failed = 12,62%`;
- `p(95) = 4,61s`;
- ambos os cenários de login executados.

O resultado demonstra que o script de performance foi executado, mas também registra falhas HTTP durante a carga. Portanto, o resultado deve ser apresentado no TCC como **evidência do comportamento observado**, e não como uma aprovação irrestrita da infraestrutura.

---

# 11. Scripts disponíveis

O `package.json` disponibiliza comandos para as principais frentes:

```bash
npm run test:api
npm run test:ui
npm run test:ui:open
npm run test:mobile
npm run test:mobile:catalog
npm run test:performance
npm run report:mobile
```

Isso permite executar as camadas separadamente.

---

# 12. Resultado geral do projeto

O projeto foi estruturado como uma solução de Quality Engineering com diferentes níveis de validação.

### Web

Cypress + JavaScript + Page Object Model.

Cobertura principal:

- login;
- fluxo de compra;
- carrinho;
- regras de quantidade;
- subtotal;
- cupons e descontos.

### API

Node.js + Supertest.

Cobertura principal:

- consulta;
- criação;
- consulta por ID;
- duplicidade;
- limpeza dos dados criados;
- validações de resposta.

### Mobile

Appium + WebdriverIO + Android + Page Objects + Allure.

Cobertura principal:

- catálogo;
- detalhes;
- busca;
- ausência de resultados;
- ordenação.

### Performance

K6.

Cobertura:

- login válido;
- login com senha inválida;
- carga simultânea;
- análise de falhas HTTP e tempo de resposta.

### CI

GitHub Actions.

Cobertura:

- Mobile Android em CI;
- execução manual de Web;
- execução manual de API;
- armazenamento de evidências Mobile.

---

# 13. Conclusão técnica

O projeto demonstra a aplicação de diferentes práticas de Engenharia de Qualidade em uma mesma aplicação, passando desde o planejamento dos cenários até a automação e execução.

A automação Web utiliza Page Objects para organizar os fluxos do e-commerce. A camada de API utiliza Supertest para validar os serviços de cupons. A automação Mobile utiliza Appium e WebdriverIO para validar o catálogo Android e gerar evidências com Allure. O K6 complementa a estratégia com testes de performance do fluxo de autenticação. Por fim, o GitHub Actions permite executar parte dessa estratégia em ambiente de integração contínua.

Os resultados de performance também mostram a importância de analisar os dados e não apenas o status final do processo: a execução foi concluída, porém foram observadas falhas HTTP e variação de tempo de resposta durante a carga.

As US-0005, US-0006, US-0007 e US-0008 foram formalizadas nesta documentação com critérios Gherkin e casos de teste para completar a estratégia exigida pelo trabalho. A ausência de scripts específicos dessas quatro histórias no repositório atual é mantida explícita para preservar a rastreabilidade e evitar afirmar uma automação que não possui evidência correspondente.

---

## 14. Referências do próprio projeto

- Repositório: https://github.com/Pedro001979/TCC-EBAC-QE
- Site alvo: http://lojaebac.ebaconline.art.br/
- Automação Web: `UI/`
- Automação API: `API/`
- Automação Mobile: `Mobile/`
- Performance: `performance/ebac-auth.js`
- CI Web/API: `.github/workflows/manual-web-api.yml`
- CI Mobile: `.github/workflows/mobile-android.yml`
