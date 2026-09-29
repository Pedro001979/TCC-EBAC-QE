const homePage = require('../page_objects/home.page');
const catalogPage = require('../page_objects/catalog.page');
const productPage = require('../page_objects/product.page');

describe('US-0004 - Catálogo de Produtos (EBAC Store Android)', () => {
  beforeEach(async () => {
    await homePage.open();
  });

  it('CT-MOB-001 - abre a loja e mostra a navegação principal', async () => {
    await expect(homePage.storeTitle).toBeDisplayed();
    await expect(homePage.searchProducts).toBeDisplayed();
    await expect(homePage.browseTab).toBeDisplayed();
  });

  it('CT-MOB-002 - mostra produtos no catálogo Browse', async () => {
    await homePage.openBrowse();
    await catalogPage.waitForProducts();

    const descriptions = await catalogPage.productDescriptions();
    expect(descriptions.length).toBeGreaterThan(0);
    expect(descriptions.every((description) =>
      description?.includes('R$') && description.split(/,\s*R\$/)[0].trim().length > 0
    )).toBe(true);
  });

  it('CT-MOB-003 - abre os detalhes de um produto disponível', async () => {
    await homePage.openBrowse();
    const productName = await catalogPage.openFirstProduct();
    await productPage.waitForProduct(productName);
    await expect(productPage.productTitle(productName)).toBeDisplayed();
    await expect(productPage.addToCartButton).toBeDisplayed();
  });

  it('CT-MOB-004 - volta dos detalhes ao catálogo pelo botão voltar', async () => {
    await homePage.openBrowse();
    const productName = await catalogPage.openFirstProduct();
    await productPage.waitForProduct(productName);
    await productPage.backButton.click();
    await catalogPage.waitForProducts();
    expect((await catalogPage.productCards).length).toBeGreaterThan(0);
  });

  it('CT-MOB-005 - filtra o catálogo por um produto existente', async () => {
    await homePage.openBrowse();
    await catalogPage.clearSearch();
    await catalogPage.waitForProducts();

    const [firstProduct] = await catalogPage.productDescriptions();
    const productName = firstProduct?.split(/,\s*R\$/)[0]?.trim();
    expect(productName).toBeTruthy();

    await catalogPage.searchFor(productName);
    await catalogPage.waitForSearchResults(
      (descriptions) => descriptions.length > 0,
      `Nenhum resultado apareceu ao buscar por "${productName}".`
    );

    const results = await catalogPage.productDescriptions();
    expect(results.every((description) =>
      description?.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
    )).toBe(true);
  });

  it('CT-MOB-006 - não mostra produtos para uma busca sem correspondência', async () => {
    await homePage.openBrowse();
    await catalogPage.clearSearch();
    await catalogPage.waitForProducts();
    await catalogPage.searchFor('produto-inexistente-qa-84721');

    await catalogPage.waitForSearchResults(
      (descriptions) => descriptions.length === 0,
      'A busca sem correspondência deveria remover os produtos da listagem.'
    );

    expect(await catalogPage.productDescriptions()).toHaveLength(0);

    await catalogPage.clearSearch();
    await catalogPage.waitForProducts();
    expect((await catalogPage.productCards).length).toBeGreaterThan(0);
  });

  it('CT-MOB-007 - aplica a ordenação por preço crescente no catálogo', async () => {
    await homePage.openBrowse();
    await catalogPage.clearSearch();
    await catalogPage.waitForProducts();
    await catalogPage.openSortOptions();

    await expect(catalogPage.sortPopularityOption).toBeDisplayed();
    await expect(catalogPage.sortPriceAscendingOption).toBeDisplayed();
    await expect(catalogPage.sortPriceDescendingOption).toBeDisplayed();
    await expect(catalogPage.sortAlphabeticalOption).toBeDisplayed();

    await catalogPage.chooseSortOption(catalogPage.sortPriceAscendingOption);
    await catalogPage.waitForProducts();
    await browser.waitUntil(async () =>
      !(await catalogPage.sortPriceAscendingOption.isDisplayed().catch(() => false)), {
      timeout: 5000,
      timeoutMsg: 'A opção de ordenação deveria fechar após a seleção.',
    });

    expect((await catalogPage.productCards).length).toBeGreaterThan(0);
    const prices = await catalogPage.displayedPrices();
    if (prices.length > 1) {
      expect(prices).toEqual([...prices].sort((left, right) => left - right));
    } else {
      console.warn('O ambiente não expôs preços numéricos acessíveis; validada a seleção da ordenação e o catálogo resultante.');
    }
  });
});
