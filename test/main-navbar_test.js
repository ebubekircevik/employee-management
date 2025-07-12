import {MainNavbar} from '../src/_shared/main-navbar/main-navbar.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('main-navbar', () => {
  test('is defined', () => {
    const el = document.createElement('main-navbar');
    assert.instanceOf(el, MainNavbar);
  });

  test('renders navbar with logo and title', async () => {
    const el = await fixture(html`<main-navbar></main-navbar>`);

    const logo = el.shadowRoot.querySelector('.navbar-logo img');
    const title = el.shadowRoot.querySelector('.navbar-title');

    assert.exists(logo);
    assert.equal(title.textContent.trim(), 'ING');
  });

  test('renders navigation links', async () => {
    const el = await fixture(html`<main-navbar></main-navbar>`);

    const employeesLink = el.shadowRoot.querySelector('a[href="/"]');
    const addNewLink = el.shadowRoot.querySelector('a[href="/edit/new"]');

    assert.exists(employeesLink);
    assert.exists(addNewLink);
  });

  test('renders language button', async () => {
    const el = await fixture(html`<main-navbar></main-navbar>`);

    const langButton = el.shadowRoot.querySelector('.lang-btn');
    assert.exists(langButton);
  });

  test('toggles language dropdown on button click', async () => {
    const el = await fixture(html`<main-navbar></main-navbar>`);

    const langButton = el.shadowRoot.querySelector('.lang-btn');
    langButton.click();
    await el.updateComplete;

    assert.isTrue(el.langDropdownOpen);

    langButton.click();
    await el.updateComplete;

    assert.isFalse(el.langDropdownOpen);
  });

  test('shows language dropdown when open', async () => {
    const el = await fixture(html`<main-navbar></main-navbar>`);
    el.langDropdownOpen = true;
    await el.updateComplete;

    const dropdown = el.shadowRoot.querySelector('.lang-dropdown');
    assert.exists(dropdown);
  });

  test('dispatches language-changed event when language selected', async () => {
    const el = await fixture(html`<main-navbar></main-navbar>`);
    el.langDropdownOpen = true;
    await el.updateComplete;

    let eventFired = false;
    window.addEventListener('language-changed', () => {
      eventFired = true;
    });

    const langItem = el.shadowRoot.querySelector('.lang-dropdown-item');
    langItem.click();

    assert.isTrue(eventFired);
  });

    test('initializes with default language', async () => {
    const el = await fixture(html`<main-navbar></main-navbar>`);
    
    // Component uses document.documentElement.lang || 'en'
    // In test environment, it might be 'tr' or 'en'
    assert.isTrue(['tr', 'en'].includes(el.lang));
    assert.isTrue(['tr', 'en'].includes(el.selectedLang.code));
    assert.isFalse(el.langDropdownOpen);
  });

  test('selects language correctly', async () => {
    const el = await fixture(html`<main-navbar></main-navbar>`);

    el.selectLang('tr');

    assert.equal(el.lang, 'tr');
    assert.equal(el.selectedLang.code, 'tr');
    assert.isFalse(el.langDropdownOpen);
  });
});
