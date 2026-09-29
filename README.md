# TCC â€” Engenharia de Qualidade de Software | EBAC Shop

Projeto de conclusÃ£o do curso de **Engenharia de Qualidade de Software**, com foco na anÃ¡lise, planejamento, execuÃ§Ã£o e automaÃ§Ã£o de testes do e-commerce EBAC Shop.

## Objetivo

Aplicar prÃ¡ticas de Quality Engineering em diferentes nÃ­veis da aplicaÃ§Ã£o, contemplando testes manuais e automatizados, integraÃ§Ã£o contÃ­nua e testes de performance.

## Estrutura do projeto

```
.
â”œâ”€â”€ UI/
â”‚   â””â”€â”€ cypress/
â”‚       â”œâ”€â”€ e2e/
â”‚       â”œâ”€â”€ fixtures/
â”‚       â””â”€â”€ support/
â”‚           â””â”€â”€ page_objects/
â”‚
â”œâ”€â”€ API/
â”œâ”€â”€ Mobile/
â”œâ”€â”€ docs/
â”œâ”€â”€ .gitignore
â”œâ”€â”€ package.json
â””â”€â”€ README.md
```

## AutomaÃ§Ã£o Web

A automaÃ§Ã£o Web utiliza **Cypress + JavaScript** e mantÃ©m os recursos jÃ¡ desenvolvidos no projeto, reorganizados dentro da pasta `UI`.

Atualmente estÃ£o estruturados:

- **US-0002 â€” Login na plataforma**
- Fluxo E2E de compra
- Massa de dados com fixture
- Comandos customizados
- Page Object para produtos
- **US003 â€” API de Cupons** com Supertest
- **US-0004 â€” CatÃ¡logo de Produtos Android** com Appium + WebdriverIO, usando Page Object e relatÃ³rio Allure

## PrÃ³ximas etapas

1. Completar a automaÃ§Ã£o Web conforme os casos de teste do TCC.
2. Executar e revisar os casos do catálogo Android definidos na suíte Mobile.
3. Integrar as automaÃ§Ãµes ao GitHub Actions.
4. Implementar os testes de performance com K6.
5. Organizar evidÃªncias finais na pasta `docs`.

## ExecuÃ§Ã£o

```bash
npm install
npm run test:ui
```

Para abrir o Cypress e testar CT-011/CT-012 (eles criam cupons pela API), configure as credenciais uma vez no arquivo local ignorado pelo Git:

```bash
cp .env.example .env.local
```

Edite `.env.local` com as credenciais renovadas e execute `npm run test:ui:open`. O arquivo `.env.local` nao e versionado.

No Cypress, abra `fluxo-compra.cy.js` e execute CT-011 ou CT-012. Os cenÃ¡rios de carrinho CT usam uma sessÃ£o de visitante isolada, sem limpar o carrinho salvo na conta.

Para executar os testes da API de cupons, configure as credenciais Basic
conforme [API/README.md](API/README.md) e rode:

```bash
npm run test:api
```

## AutomaÃ§Ã£o Mobile Android

Instale as dependências conforme [Mobile/README.md](Mobile/README.md). Com um dispositivo/emulador Android e o APK local configurados:

```bash
npm run test:mobile:catalog
npm run report:mobile
```

O APK do EBAC Store é um artefato local ignorado pelo Git. A suíte de catálogo não requer credenciais.

## Autor

**Pedro Ricardo**  
QA Automation | Cypress | JavaScript | Web | API | Mobile

