# Testes da API de cupons

Os testes da US003 usam Node.js, `node:test` e Supertest. Cobrem listagem, criacao, consulta por ID e rejeicao de codigo duplicado. O cupom de teste recebe um codigo unico e e removido ao final.

## Configuracao local

A documentacao Swagger fica em `/rest-api/docs`, mas o schema define `basePath: /wp-json`. Assim, o endpoint e `/wp-json/wc/v3/coupons`. Copie `.env.example` para `.env.local` e preencha usuario e senha Basic da API. O arquivo `.env.local` e ignorado pelo Git; nao o envie nem compartilhe.

```bash
cp .env.example .env.local
npm run test:api
```

Tambem aceita o cabecalho completo, caso ja tenha a credencial codificada em Base64:

```bash
read -rsp "Credencial Basic (sem a palavra Basic): " EBAC_CREDENTIAL
echo
export EBAC_API_AUTHORIZATION="Basic $EBAC_CREDENTIAL"
unset EBAC_CREDENTIAL
npm run test:api
unset EBAC_API_AUTHORIZATION
```

Para sobrescrever a URL base, defina `EBAC_API_BASE_URL`, incluindo `/wp-json`. Sem credenciais, a suite e ignorada e nao faz chamadas a loja.
