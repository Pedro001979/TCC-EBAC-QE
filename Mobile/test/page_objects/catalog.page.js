class CatalogPage {
  get title() {
    return $('android=new UiSelector().text("Browse")');
  }

  get searchInput() {
    return $('android=new UiSelector().className("android.widget.EditText")');
  }

  get productCards() {
    return $$('android=new UiSelector().descriptionContains("R$")');
  }

  get sortByButton() {
    return $('android=new UiSelector().descriptionContains("Sort By")');
  }

  get sortPopularityOption() {
    return $('android=new UiSelector().text("Popularity")');
  }

  get sortPriceAscendingOption() {
    return $('android=new UiSelector().text("Price -- Low to high")');
  }

  get sortPriceDescendingOption() {
    return $('android=new UiSelector().text("Price -- High to Low")');
  }

  get sortAlphabeticalOption() {
    return $('android=new UiSelector().text("Alphabetical")');
  }

  async waitForProducts() {
    await this.title.waitForDisplayed();
    await this.searchInput.waitForDisplayed();
    await browser.waitUntil(async () => (await this.productCards).length > 0, {
      timeout: 20000,
      timeoutMsg: 'Nenhum produto apareceu na tela Browse do EBAC Store.',
    });
  }

  async productDescriptions() {
    const cards = await this.productCards;
    const descriptions = [];

    for (let index = 0; index < cards.length; index += 1) {
      descriptions.push(await cards[index].getAttribute('contentDescription'));
    }

    return descriptions;
  }

  async searchFor(term) {
    await this.searchInput.waitForDisplayed();
    await this.searchInput.clearValue();
    await this.searchInput.setValue(term);
    await browser.hideKeyboard().catch(() => {});
  }

  async clearSearch() {
    await this.searchInput.waitForDisplayed();
    await this.searchInput.clearValue();
    await browser.hideKeyboard().catch(() => {});
  }

  async waitForSearchResults(predicate, message) {
    await browser.waitUntil(async () => predicate(await this.productDescriptions()), {
      timeout: 10000,
      timeoutMsg: message,
    });
  }

  async openSortOptions() {
    await this.sortByButton.waitForDisplayed();
    await this.sortByButton.click();
    await this.sortPopularityOption.waitForDisplayed();
  }

  async chooseSortOption(option) {
    await option.click();
    await this.title.waitForDisplayed();
  }

  async displayedPrices() {
    const descriptions = await this.productDescriptions();
    return descriptions
      .map((description) => description?.match(/R\$\s*([\d.,]+)/)?.[1])
      .filter(Boolean)
      .map((price) => {
        const commaIsDecimal = price.lastIndexOf(',') > price.lastIndexOf('.');
        const normalized = commaIsDecimal
          ? price.replace(/\./g, '').replace(',', '.')
          : price.replace(/,/g, '');
        return Number(normalized);
      });
  }

  async waitForDisplayedPrices() {
    await browser.waitUntil(async () => (await this.displayedPrices()).length > 1, {
      timeout: 20000,
      timeoutMsg: 'O catálogo não terminou de carregar preços após alterar a ordenação.',
    });
  }

  async openFirstProduct() {
    await this.waitForProducts();

    const [firstProduct] = await this.productCards;
    const description = await firstProduct.getAttribute('contentDescription');
    const productName = description?.split(/,\s*R\$/)[0];

    if (!productName) {
      throw new Error('O primeiro cartão do catálogo não informou o nome do produto.');
    }

    await firstProduct.click();
    return productName;
  }
}

module.exports = new CatalogPage();
