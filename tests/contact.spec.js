import { test, expect } from '@playwright/test';
import { ContactPage } from '../pageObject/contact.po';
import { LoginPage } from '../pageObject/login.po';

const contactData = require('../fixtures/contactFixtures.json');
const testData = require('../fixtures/loginFixtures.json');

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('/');
  await login.login(testData.validUser.userName, testData.validUser.password);
  await login.verifyValidLogin();
});

test.describe('Contact testcases', () => {
  test('Contact add test', async ({ page }) => {
    const contact = new ContactPage(page);
    const {
      firstName, lastName, dob, email, phone,
      street1, street2, city, stateProvince, postalCode, country
    } = contactData.contact;

    await contact.addContact(
      firstName, lastName, dob, email, phone,
      street1, street2, city, stateProvince, postalCode, country
    );
    await contact.validateContactCreated(
      firstName, lastName, dob, email, phone,
      street1, street2, city, stateProvince, postalCode, country
    );
  });

  test('Contact Edit test', async ({ page }) => {
    const editData = {
      firstName: "Aayan",
      lastName: "Shrestha",
      dob: "1990-01-01",
      email: "ayaan@gmail.com",
      phone: "9860008990",
      street1: "japaneese colony",
      street2: "Khichapokhari",
      city: "Kathmandu",
      stateProvince: "Bagmati",
      postalCode: "44600",
      country: "Nepal"
    };

    const contact = new ContactPage(page);
    const {
      firstName, lastName, dob, email, phone,
      street1, street2, city, stateProvince, postalCode, country
    } = contactData.contact;

    await page.reload();
    await contact.viewContact(); // See below for implementation

    await contact.editContact(
      firstName, lastName, // Find by original name
      editData.firstName, editData.lastName, editData.dob, editData.email, editData.phone,
      editData.street1, editData.street2, editData.city, editData.stateProvince, editData.postalCode, editData.country
    );

    await contact.validateContactCreated(
      editData.firstName, editData.lastName, editData.dob, editData.email, editData.phone,
      editData.street1, editData.street2, editData.city, editData.stateProvince, editData.postalCode, editData.country
    );
  });
});
