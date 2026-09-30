# Teste de performance com k6

O script `ebac-auth.js` cobre dois fluxos: login com credenciais validas e login com senha invalida. Os dois cenarios somam 20 VUs: 10 por fluxo. Cada cenario sobe de zero a 10 VUs em 20 segundos e mantem essa carga por mais 100 segundos.

## Pre-requisitos

- Instale o k6: https://grafana.com/docs/k6/latest/set-up/install-k6/
- Use um ambiente de teste autorizado. O destino padrao e a loja publica do curso; nao execute carga nela sem autorizacao do responsavel.
- Forneca cinco contas de teste pela variavel `K6_TEST_USERS`. Nao coloque senhas em arquivos versionados.

## Execucao no PowerShell

Defina as credenciais no ambiente do terminal, sem salvar os valores no repositorio:

```powershell
$env:K6_TEST_USERS = '[{"username":"user1_ebac","password":"..."},{"username":"user2_ebac","password":"..."},{"username":"user3_ebac","password":"..."},{"username":"user4_ebac","password":"..."},{"username":"user5_ebac","password":"..."}]'
$env:EBAC_BASE_URL = 'https://URL-DO-AMBIENTE-AUTORIZADO'
npm run test:performance
Remove-Item Env:K6_TEST_USERS
Remove-Item Env:EBAC_BASE_URL
```

O script encerra com falha se nao receber cinco contas ou se os checks funcionais/limites de desempenho nao forem atendidos. Os limites iniciais sao menos de 5% de requisicoes com falha e percentil 95 abaixo de 2.5 segundos; calibre-os depois de executar uma linha de base no ambiente escolhido.
