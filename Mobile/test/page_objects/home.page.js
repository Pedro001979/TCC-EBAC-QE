class HomePage {
  get storeTitle() {
    return $('android=new UiSelector().text("EBAC Store")');
  }

  get searchProducts() {
    return $('android=new UiSelector().text("Search Products")');
  }

  get homeTab() {
    return $('android=new UiSelector().descriptionContains("Home")');
  }

  get browseTab() {
    return $('android=new UiSelector().descriptionContains("Browse")');
  }

  get backButton() {
    return $('android=new UiSelector().resourceIdMatches(".*back")');
  }

  async open() {
    if (await this.backButton.isDisplayed().catch(() => false)) {
      await this.backButton.click();
    }

    await this.homeTab.waitForDisplayed();
    await this.homeTab.click();
    await this.storeTitle.waitForDisplayed();
  }

  async openBrowse() {
    await this.browseTab.waitForDisplayed();
    await this.browseTab.click();
  }
}

module.exports = new HomePage();
