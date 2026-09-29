# Automação Mobile Android

Esta pasta implementa a US-0004 do TCC para o app EBAC Store (br.com.lojaebac). A automação usa Appium, WebdriverIO, Mocha, Page Objects e Allure.

## Estrutura

- test/page_objects/: Page Object Model (POM) para Home, Browse e detalhes do produto.
- test/page_objects/catalog.page.js: listagem de produtos.
- test/page_objects/product.page.js: detalhes do produto e botão de compra.
- test/specs/catalog.spec.js: sete casos CT-MOB-001–007, cobrindo navegação, listagem, detalhes, busca positiva e sem resultados, e ordenação crescente por preço.
- wdio.conf.cjs: emulador Android, APK, Appium e captura de screenshot em falhas.
- apps/ebacshop.apk: APK local do EBAC Store; o binário não é versionado.

## Casos automatizados

| ID | Cenário | Validação principal |
|---|---|---|
| CT-MOB-001 | Abrir a loja | Home, busca e navegação principal visíveis |
| CT-MOB-002 | Consultar Browse | Lista contém nome acessível e preço dos produtos |
| CT-MOB-003 | Abrir produto | Detalhes exibem o produto selecionado e Add To Cart |
| CT-MOB-004 | Voltar dos detalhes | Retorno ao catálogo mantém a lista disponível |
| CT-MOB-005 | Buscar produto existente | Resultados correspondem ao nome pesquisado |
| CT-MOB-006 | Buscar produto inexistente | Lista fica vazia; limpar a busca restaura produtos |
| CT-MOB-007 | Ordenar por preço crescente | Opções de ordenação existem e preços exibidos ficam em ordem crescente |

## Pré-requisitos

- Node.js 20.19 ou superior.
- Android SDK e emulador Android ou dispositivo com depuração USB.
- Appium 3 e driver UiAutomator2.

## Instalação

Na raiz do repositório:

    npm --prefix Mobile install
    npm --prefix Mobile run appium:driver

Coloque o APK correto em Mobile/apps/ebacshop.apk. O arquivo APK fica ignorado pelo Git. O teste do EBAC Store não precisa de credenciais de login.

O arquivo Mobile/.env é opcional e pode sobrescrever o caminho do APK, host, porta e nome do dispositivo. Ele não deve conter credenciais da API.

## Execução

Inicie o emulador e deixe o servidor Appium aberto em um terminal:

    cd Mobile
    npm run appium:start

Em outro terminal, também dentro de Mobile:

    npm run test:catalog

Gere e abra o relatório Allure:

    npm run report
    npm run report:open

Os seletores usados nos Page Objects foram conferidos na hierarquia Android do ebacshop.apk: textos acessíveis das telas Home/Browse, descrição de acessibilidade dos cartões, controles de busca e ordenação e texto Add To Cart. A suíte confere que a busca mantém somente correspondências, que uma busca sem resultado não exibe cartões e que a ordenação por preço crescente corresponde aos preços apresentados. Ela não usa a tela de login nem os dados do aplicativo WooCommerce de outro repositório.

## Integração contínua

O workflow `../.github/workflows/mobile-android.yml` roda nos pushes e pull requests para `main`. Ele baixa o pacote EBAC Store da distribuição pública da EBAC, instala o app no emulador Android com Bundletool, executa os testes pelo Appium e publica os arquivos Allure como artefato da execução. O APK não precisa ser commitado neste repositório.
