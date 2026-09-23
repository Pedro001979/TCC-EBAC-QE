# TCC — Engenharia de Qualidade de Software | EBAC Shop

Projeto de conclusão do curso de **Engenharia de Qualidade de Software**, com foco na análise, planejamento, execução e automação de testes do e-commerce EBAC Shop.

## Objetivo

Aplicar práticas de Quality Engineering em diferentes níveis da aplicação, contemplando testes manuais e automatizados, integração contínua e testes de performance.

## Estrutura do projeto

```
.
├── UI/
│   └── cypress/
│       ├── e2e/
│       ├── fixtures/
│       └── support/
│           └── page_objects/
│
├── API/
├── Mobile/
├── docs/
├── .gitignore
├── package.json
└── README.md
```

## Automação Web

A automação Web utiliza **Cypress + JavaScript** e mantém os recursos já desenvolvidos no projeto, reorganizados dentro da pasta `UI`.

Atualmente estão estruturados:

- **US-0002 — Login na plataforma**
- Fluxo E2E de compra
- Massa de dados com fixture
- Comandos customizados
- Page Object para produtos

## Próximas etapas

1. Completar a automação Web conforme os casos de teste do TCC.
2. Criar a automação da API utilizando Supertest.
3. Criar a automação Mobile utilizando Appium + WebdriverIO.
4. Integrar as automações ao GitHub Actions.
5. Implementar os testes de performance com K6.
6. Organizar evidências e relatórios na pasta `docs`.

## Execução

```bash
npm install
npm run test:ui
```

Para abrir o Cypress:

```bash
npm run test:ui:open
```

## Autor

**Pedro Ricardo**  
QA Automation | Cypress | JavaScript | Web | API | Mobile
