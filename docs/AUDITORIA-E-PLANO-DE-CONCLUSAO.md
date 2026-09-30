# Auditoria técnica e plano de conclusão do TCC — EBAC Shop

**Responsável:** Pedro Ricardo Belo de Sá  
**Repositório:** https://github.com/Pedro001979/TCC-EBAC-QE  
**Branch:** main  
**Data:** 30/09/2026

## 1. Resumo executivo

O repositório possui uma base organizada para automação Web, API e Mobile Android: pastas separadas, Page Objects, fixtures, scripts npm, documentação técnica e workflow GitHub Actions para Android. O histórico de Actions mostra a execução Mobile run 11 concluída com sucesso em 29/09/2026 e a run 10 anterior com falha.

**O TCC ainda não pode ser declarado integralmente concluído.** A evidência de CI cobre apenas Mobile Android. Não há workflow Web/API visível nem implementação K6 na árvore auditada. A suíte API depende de credenciais e não foi comprovada como executada nesta auditoria. O documento acadêmico também precisa consolidar rastreabilidade, evidências, resultados, conclusão e referências.

## 2. Matriz de atendimento aos requisitos

| Requisito | Estado observado | Observação |
|---|---|---|
| Estratégia em mapa mental | Parcial / confirmar | O guia reserva espaço para imagem do mapa; confirmar que o mapa final está inserido no DOCX. |
| Critérios Gherkin para US-0001 e US-0002 | Parcial | O guia define quatro cenários para carrinho e login. O código contém testes de login CT-005–008 e fluxos de carrinho/compra; consolidar a rastreabilidade no documento. |
| US-0003 API de cupons | Parcial | Testes existentes cobrem listagem, criação, consulta por ID e duplicidade. Faltam testes dedicados explícitos para cupom inexistente e dados inválidos, conforme o guia. |
| US-0004 a US-0008 | Parcial / não evidenciado | O guia pede Catálogo, Minha Conta, Meus Pedidos, Endereços e Detalhes da Conta. A suíte Mobile cobre parte do catálogo; não foi localizada cobertura completa das demais histórias. |
| Mínimo de quatro casos por história, incluindo positivos/alternativos/negativos e técnicas | Parcial | Há casos de carrinho, login, compra e catálogo Mobile, mas falta matriz completa por história, técnica, automação e evidência. |
| Repositório público com documento e fontes | Atendido em estrutura | Repositório público com UI, API, Mobile, docs, README e DOCX versionado. |
| UI com comparação de três ferramentas/linguagens e Testing Pattern | Parcial | Cypress + JavaScript e Page Objects estão presentes. Formalizar a comparação solicitada e justificar a escolha no texto acadêmico. |
| API com Supertest e contrato | Parcial | Supertest e node:test estão presentes; fortalecer contrato com schema explícito e cenários negativos requeridos. |
| Mobile Android/iOS, catálogo, padrão e relatório | Em boa parte atendido | Appium, WebdriverIO, Page Objects, sete casos CT-MOB-001–007 e Allure. O workflow Android está configurado. |
| GitHub Actions | Parcial | Workflow Mobile Android presente; não foi encontrado workflow para UI e API. |
| K6 em dois casos, 20 VUs, 2 min, ramp-up 20 s | Não implementado / não evidenciado | Não há pasta ou script K6 na árvore auditada. |
| Conclusão e referências ABNT | Pendente de revisão | O guia exige conclusão reflexiva e referências ABNT; verificar e completar no DOCX final. |

## 3. Inventário e análise técnica

### 3.1 Raiz

O package.json disponibiliza test:api, test:ui, test:ui:open, test:mobile, test:mobile:catalog e report:mobile. Há .env.example e .gitignore. A documentação informa que .env.local e o APK local não devem ser versionados. O README descreve as três frentes, mas a lista de próximas etapas precisa ser atualizada para refletir o Mobile CI já existente.

### 3.2 UI — Cypress

Arquivos principais: UI/cypress.config.js; UI/cypress/e2e/login.cy.js; UI/cypress/e2e/fluxo-compra.cy.js; UI/cypress/support/commands.js; Page Objects de login e produtos; fixture perfil.json.

Cobertura identificada: login válido e negativos de senha inválida, usuário ausente e senha ausente (CT-005–008); fluxo completo de compra; CT-009 limite de unidades; CT-010 teto de subtotal; CT-011 e CT-012 descontos percentuais, com criação e remoção de cupons pela API.

Pontos de atenção: os testes de login dependem de usuário/senha válidos; CT-011/012 dependem de credenciais REST; o checkout usa espera fixa de 8 segundos, preferível substituir por espera baseada em estado; validar que CT-009 realmente adiciona o produto antes de aceitar carrinho vazio como resultado; comprovar que CT-010 alcança a condição de limite; executar compras somente em ambiente de teste com dados fictícios. Não foi localizado workflow de CI para UI.

### 3.3 API — Supertest

API/coupons.test.js usa node:test e Supertest. Implementa listagem, criação com código único, consulta por ID, rejeição de duplicidade e remoção do cupom criado. A suíte é ignorada sem credenciais, evitando chamadas não autenticadas.

Lacunas: criar cenários explícitos para cupom inexistente e payload inválido; formalizar o contrato com schema e campos/tipos obrigatórios; documentar limpeza de dados caso a execução seja interrompida. Um teste ignorado por ausência de credenciais não é teste aprovado. É necessária execução real com credenciais autorizadas para registrar resultado.

### 3.4 Mobile Android — Appium/WebdriverIO

A suíte catalog.spec.js contém CT-MOB-001–007: abrir loja, listar produtos, abrir detalhes, voltar ao catálogo, busca com resultado, busca sem resultado e ordenação crescente. Há Page Objects e Allure. O workflow instala dependências, prepara emulador, instala o app, inicia Appium, executa a suíte e publica artefatos.

A run 11 do workflow Mobile Android terminou com sucesso em 29/09/2026; a run 10 anterior terminou com falha. Isso comprova uma execução bem-sucedida do workflow Mobile no commit correspondente, não a aprovação das outras frentes. Em CT-MOB-007, quando preços numéricos não estão acessíveis, o teste pode emitir aviso e não comparar a ordem; registrar esse caso como validação parcial/inconclusiva da ordenação efetiva.

## 4. Plano de conclusão priorizado

### Prioridade 1 — documento e rastreabilidade
- Consolidar matriz História → critério Gherkin → caso → automação → evidência → resultado.
- Confirmar ao menos quatro critérios e quatro casos por história, conforme o enunciado.
- Inserir o mapa mental real e evidências de execução no DOCX.
- Acrescentar comparação de pelo menos três ferramentas/linguagens para UI e justificar Cypress/JavaScript; explicitar Page Object como padrão utilizado.
- Completar conclusão, limitações, resultados e referências ABNT.

### Prioridade 2 — API
- Implementar testes para cupom inexistente e dados inválidos, conforme contrato real.
- Validar resposta contra schema formal, além de status e tipos isolados.
- Executar npm run test:api com credenciais de teste e registrar ambiente, data, commit, duração e resultado.
- Garantir limpeza dos dados criados mesmo em falhas intermediárias.

### Prioridade 3 — CI
- Criar workflow ou jobs para npm run test:ui e npm run test:api.
- Armazenar credenciais em GitHub Secrets; nunca expor segredos em código, fixtures, YAML ou logs.
- Publicar relatórios e evidências como artefatos e manter o workflow Mobile existente.

### Prioridade 4 — K6
- Criar pasta performance com pelo menos dois cenários vinculados aos casos de uso.
- Aplicar 20 usuários virtuais, duração de 2 minutos e ramp-up de 20 segundos, conforme o enunciado.
- Usar massa de dados somente em ambiente autorizado e proteger credenciais.
- Definir thresholds mensuráveis e justificados, identificando-os como critérios do projeto quando não forem fornecidos pelo enunciado.
- Executar e anexar relatório, configuração, resultados e limitações.

### Prioridade 5 — validação final
- Fazer instalação limpa: npm ci na raiz e npm ci --prefix Mobile.
- Executar UI, API, Mobile e K6 separadamente; registrar comando, ambiente, data, commit, resultado e evidência.
- Revisar logs para remover segredos e atualizar README e DOCX somente com resultados realmente obtidos.

## 5. Comandos de execução

**Web:** na raiz, executar npm ci; configurar .env.local quando necessário; executar npm run test:ui. Para modo interativo, npm run test:ui:open.

**API:** configurar credenciais autorizadas em .env.local e executar npm run test:api. Sem credenciais, registrar como ignorado/não executado, nunca como aprovado.

**Mobile:** instalar com npm ci --prefix Mobile; iniciar emulador e Appium conforme Mobile/README.md; executar npm run test:mobile:catalog e gerar relatório com npm run report:mobile. O APK local não é versionado.

**Performance:** não há comando K6 implementado na versão auditada; documentar após a criação dos scripts.

## 6. Critério para declarar conclusão

Marcar o TCC como concluído somente quando todas as histórias requeridas tiverem critérios e casos rastreáveis; UI, API, Mobile e dois cenários K6 estiverem implementados e executados; os relatórios corresponderem a execuções reais e identificarem ambiente/data/commit; a CI cobrir o plano de testes; o DOCX contiver estratégia, critérios, casos, justificativas, resultados, conclusão e referências ABNT; e não houver segredos ou dados pessoais expostos.

## 7. Limitações desta auditoria

A análise foi baseada na árvore e nos arquivos versionados, no documento de orientação fornecido e no histórico visível do GitHub Actions. Não foram executados testes no computador do autor, não foram usadas credenciais da loja e não foi realizada compra real. Assim, somente a execução Mobile indicada acima tem evidência de CI aprovada; UI, API e performance precisam de execução reproduzível antes de serem declaradas funcionando.
