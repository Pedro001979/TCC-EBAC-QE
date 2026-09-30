# TCC — Engenharia de Qualidade de Software | EBAC Shop

Projeto de conclusão do curso de Engenharia de Qualidade de Software, com foco na análise, planejamento, execução e automação de testes do e-commerce EBAC Shop.

## Objetivo do projeto

Aplicar práticas de Quality Engineering em diferentes níveis da aplicação, cobrindo:

- testes de interface web
- testes de API
- testes mobile Android
- testes de performance com K6
- documentação e evidências do processo de validação

## Visão geral da arquitetura

O projeto reúne testes automatizados em 4 frentes principais:

- `UI/` — automação de web com Cypress
- `API/` — testes de API de cupons com Node.js + Supertest
- `Mobile/` — automação Android com Appium + WebdriverIO
- `performance/` — testes de performance do fluxo de login com k6

## Estrutura do repositório

```text
.
├── API/
│   ├── README.md
│   ├── coupons.test.js
│   └── load-env.js
├── Mobile/
│   ├── README.md
│   ├── apps/
│   ├── test/
│   ├── wdio.conf.cjs
│   └── package.json
├── UI/
│   ├── cypress/
│   └── cypress.config.js
├── performance/
│   └── ebac-auth.js
├── docs/
│   └── README.md
├── .gitignore
├── package.json
├── README.md
└── LICENSE (se existir no projeto)
```

## Status atual

O projeto está em fase de consolidação e documentação dos resultados. As automações principais já estão organizadas por camada e a execução de performance do fluxo de login foi validada com sucesso no ambiente real.

### Cobertura atual

- Web: Cypress para fluxo principal do e-commerce
- API: validação da API de cupons
- Mobile: catalog flow no app EBAC Store
- Performance: login em carga usando k6

## Como executar

### 1) Instalar dependências da raiz

```bash
npm install
```

### 2) Testes de API

Configure as credenciais da API conforme a documentação em [API/README.md](API/README.md) e execute:

```bash
npm run test:api
```

### 3) Testes de UI com Cypress

```bash
npm run test:ui
```

Para abrir a interface do Cypress:

```bash
npm run test:ui:open
```

> A configuração local de ambiente pode exigir arquivo `.env.local` para credenciais e dados sensíveis, conforme a estrutura do projeto.

### 4) Testes Mobile Android

Consulte [Mobile/README.md](Mobile/README.md). O fluxo de catálogo depende de emulador Android, Appium e do APK local do EBAC Store.

```bash
npm run test:mobile
npm run report:mobile
```

### 5) Testes de performance com k6

O script principal está em `performance/ebac-auth.js` e pode ser executado diretamente:

```bash
k6 run performance/ebac-auth.js
```

Também existe atalho na raiz:

```bash
npm run test:performance
```

## Evidência de execução do desempenho

A execução do script de performance foi validada com sucesso no ambiente real. Resultado verificado na última execução:

```text
running (2m04.9s), 297 complete and 0 interrupted iterations
http_req_failed..................: 12.62%
http_req_duration..............: p(95)=4.61s
login_senha_invalida ✓
login_valido         ✓
```

Esse resultado mostra que o script funciona, mas também evidencia que a infraestrutura alvo apresenta instabilidade real sob carga, com falhas HTTP durante o processo de autenticação.

## Observações importantes

- O script de performance foi ajustado para funcionar em execução direta, com fallback para usuários padrão caso `K6_TEST_USERS` não seja informado.
- O sistema alvo não é totalmente estável em carga, o que deve ser considerado como parte do resultado do TCC.
- O foco principal da automação não é apenas “verde no teste”, mas validar comportamento real da aplicação e documentar o que acontece em produção/ambiente de homologação.

## Documentação complementar

- [API/README.md](API/README.md)
- [Mobile/README.md](Mobile/README.md)
- [docs/README.md](docs/README.md)

## Autor

**Pedro Ricardo**  
QA Automation | Cypress | JavaScript | API | Mobile | Performance Testing

