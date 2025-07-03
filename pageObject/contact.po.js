const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {

  constructor(page) {
    this.page = page;

    // Buttons
    this.addContactBtn = '//button[@id="add-contact"]';
    this.submitButton = '//button[@id="submit"]';
    this.cancelButton = '//button[@id="cancel"]';
    this.viewCreatedContact = '//button[@id="view-contact"]'; // Adjust if needed
    this.editContactBtn = '//button[@id="edit-contact"]'; // Adjust if needed

    // Form inputs
    this.firstNameInput = '#firstName';
    this.lastNameInput = '//input[@id="lastName"]';
    this.birthDateInput = '//input[@id="birthdate"]';
    this.emailInput = '//input[@id="email"]';
    this.phoneInput = '//input[@id="phone"]';
    this.streetOneInput = '//input[@id="street1"]';
    this.streetTwoInput = '//input[@id="street2"]';
    this.cityInput = '//input[@placeholder="City"]';
    this.stateProvinceInput = '//input[@id="stateProvince"]';
    this.postalCodeInput = '//input[@id="postalCode"]';
    this.countryInput = '//input[@id="country"]';

    // Saved (view mode) fields
    this.savedFirstName = '#firstName';
    this.savedLastName = '//span[@id="lastName"]';
    this.savedBirthDate = '//span[@id="birthdate"]';
    this.savedEmail = '//span[@id="email"]';
    this.savedPhone = '//span[@id="phone"]';
    this.savedStreetOne = '//span[@id="street1"]';
    this.savedStreetTwo = '//span[@id="street2"]';
    this.savedCity = '//span[@placeholder="City"]';
    this.savedStateProvince = '//span[@id="stateProvince"]';
    this.savedPostalCode = '//span[@id="postalCode"]';
    this.savedCountry = '//span[@id="country"]';
  }

  async addContact(firstName, lastName, birthDate, email, phone, street1, street2, city, stateProvince, postalCode, country) {
    await this.page.locator(this.addContactBtn).click();
    await this.page.locator(this.firstNameInput).fill(firstName);
    await this.page.locator(this.lastNameInput).fill(lastName);
    await this.page.locator(this.birthDateInput).fill(birthDate);
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.phoneInput).fill(phone);
    await this.page.locator(this.streetOneInput).fill(street1);
    await this.page.locator(this.streetTwoInput).fill(street2);
    await this.page.locator(this.cityInput).fill(city);
    await this.page.locator(this.stateProvinceInput).fill(stateProvince);
    await this.page.locator(this.postalCodeInput).fill(postalCode);
    await this.page.locator(this.countryInput).fill(country);
    await this.page.waitForTimeout(1000); // Optional delay for animation
    await this.page.locator(this.submitButton).click();
  }

  async validateContactCreated(fName, lName, dob, email, phone, street1, street2, city, stateProvince, postalCode, country) {
    await this.page.locator(this.viewCreatedContact).click();
    await expect(this.page.locator(this.savedFirstName)).toHaveText(fName);
    await expect(this.page.locator(this.savedLastName)).toHaveText(lName);
    await expect(this.page.locator(this.savedBirthDate)).toHaveText(dob);
    await expect(this.page.locator(this.savedEmail)).toHaveText(email);
    await expect(this.page.locator(this.savedPhone)).toHaveText(phone);
    await expect(this.page.locator(this.savedStreetOne)).toHaveText(street1);
    await expect(this.page.locator(this.savedStreetTwo)).toHaveText(street2);
    await expect(this.page.locator(this.savedCity)).toHaveText(city);
    await expect(this.page.locator(this.savedStateProvince)).toHaveText(stateProvince);
    await expect(this.page.locator(this.savedPostalCode)).toHaveText(postalCode);
    await expect(this.page.locator(this.savedCountry)).toHaveText(country);
  }

  async viewContact() {
    await this.page.locator(this.viewCreatedContact).click();
  }

  async editContact(
    oldFirstName, oldLastName,
    firstName, lastName, birthDate, email, phone, street1, street2, city, stateProvince, postalCode, country
  ) {
    // Find and click the contact to edit (adjust selector as needed)
    await this.page.locator(`text=${oldFirstName}`).click();
    await this.page.locator(this.editContactBtn).click();

    // Fill form fields with new data
    await this.page.locator(this.firstNameInput).fill(firstName);
    await this.page.locator(this.lastNameInput).fill(lastName);
    await this.page.locator(this.birthDateInput).fill(birthDate);
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.phoneInput).fill(phone);
    await this.page.locator(this.streetOneInput).fill(street1);
    await this.page.locator(this.streetTwoInput).fill(street2);
    await this.page.locator(this.cityInput).fill(city);
    await this.page.locator(this.stateProvinceInput).fill(stateProvince);
    await this.page.locator(this.postalCodeInput).fill(postalCode);
    await this.page.locator(this.countryInput).fill(country);

    await this.page.waitForTimeout(1000); // Optional
    await this.page.locator(this.submitButton).click();
  }
  async contactDelete() {
    await this.page.waitForTimeout(200);
    this.page.once('dialog',async dialog=>(){
      console.log('dialog message:${dialog.message()}');
      await 
    })
  }
  }
};
