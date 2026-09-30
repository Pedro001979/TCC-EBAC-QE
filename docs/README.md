# Documentação do projeto

## Objetivo
Registrar a estrutura, as evidências e os resultados do TCC em qualidade de software para o EBAC Shop, cobrindo testes de web, API, mobile e performance.

## Materiais e acompanhamento do TCC

- Inventário do repositório, requisitos, cobertura observada, riscos e pendências do projeto.
- Documento acadêmico final do trabalho, com a narrativa e a análise dos resultados.
- Evidências e relatórios de execução, com identificação de data, ambiente, commit e resultado.
- Estratégia de testes e mapa mental, com a descrição final da abordagem adotada.
- Relatório K6 com execução real e interpretação dos dados coletados.

> Não deve ser registrado como aprovado qualquer teste sem evidência reproduzível e sem credenciais ou ambiente válidos.

## Escopo de teste

### Web (Cypress)
- fluxo principal de compra
- login de usuário
- navegação no e-commerce
- cenários de validação de interface

### API
- testes de cupons via WooCommerce REST API
- validação de criação, listagem, consulta e rejeição de duplicidade

### Mobile Android
- catálogo do app EBAC Store
- busca, navegação, detalhes e ordenação

### Performance
- login com carga simulada usando k6
- medição de tempo de resposta e falhas HTTP

## Ambiente de teste

- Site alvo: http://lojaebac.ebaconline.art.br
- Fluxo validado: /minha-conta/
- Script principal: performance/ebac-auth.js

## Dados de execução do teste de performance

Comando executado:

```bash
k6 run performance/ebac-auth.js
```

Resultado verificado na última execução:

- http_req_failed = 12.62%
- p(95) = 4.61s
- iterations = 297
- running (2m04.9s)
- login_senha_invalida ✓
- login_valido ✓

## Interpretação

A execução do script foi concluída com sucesso, demonstrando que a automação de performance funciona e está integrada ao projeto. Ao mesmo tempo, a infraestrutura do site alvo apresenta instabilidade real em carga, com respostas HTTP falhas e variação de tempo, o que reforça a importância do monitoramento e da análise crítica dos resultados.

## Conclusão

O projeto alcançou o objetivo principal de validar diferentes camadas da aplicação e consolidar evidências práticas de qualidade. A automação está funcional, e os resultados obtidos devem ser utilizados no TCC como evidência de comportamento real do sistema em ambiente de homologação/produção.

## Observações finais

- o script de performance foi ajustado para funcionar sem configuração manual adicional
- o ambiente externo pode falhar em cenários de carga
- a automação deve ser usada como evidência de comportamento real, não apenas como critério de “verde/verde” sem contexto
