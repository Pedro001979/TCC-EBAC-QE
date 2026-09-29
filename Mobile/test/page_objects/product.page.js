class ProductPage {
  get addToCartButton() {
    return $('android=new UiSelector().text("Add To Cart")');
  }

  get backButton() {
    return $('android=new UiSelector().resourceIdMatches(".*back")');
  }

  productTitle(name) {
    return $(`android=new UiSelector().text("${name}")`);
  }

  async waitForProduct(name) {
    await this.productTitle(name).waitForDisplayed();
    await this.addToCartButton.waitForDisplayed();
  }
}

module.exports = new ProductPage();
