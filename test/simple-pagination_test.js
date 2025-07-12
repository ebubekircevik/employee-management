import {SimplePagination} from '../src/_shared/simple-pagination/simple-pagination.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('simple-pagination', () => {
  test('is defined', () => {
    const el = document.createElement('simple-pagination');
    assert.instanceOf(el, SimplePagination);
  });

  test('renders pagination buttons', async () => {
    const el = await fixture(html`<simple-pagination></simple-pagination>`);
    el.page = 1;
    el.totalPages = 3;
    await el.updateComplete;

    const buttons = el.shadowRoot.querySelectorAll('button');
    assert.isTrue(buttons.length > 0);
  });

  test('shows current page as active', async () => {
    const el = await fixture(html`<simple-pagination></simple-pagination>`);
    el.page = 2;
    el.totalPages = 5;
    await el.updateComplete;

    const activeButton = el.shadowRoot.querySelector('button.active');
    assert.equal(activeButton.textContent.trim(), '2');
  });

  test('disables navigation buttons on edges', async () => {
    const el = await fixture(html`<simple-pagination></simple-pagination>`);
    el.page = 1;
    el.totalPages = 5;
    await el.updateComplete;

    const prevButton = el.shadowRoot.querySelector('.left-arrow');
    const nextButton = el.shadowRoot.querySelector('.right-arrow');

    assert.isTrue(prevButton.disabled);
    assert.isFalse(nextButton.disabled);
  });

  test('dispatches page-change event', async () => {
    const el = await fixture(html`<simple-pagination></simple-pagination>`);
    el.page = 1;
    el.totalPages = 5;
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('page-change', (e) => {
      eventFired = true;
      assert.equal(e.detail.page, 2);
    });

    const nextButton = el.shadowRoot.querySelector('.right-arrow');
    nextButton.click();

    assert.isTrue(eventFired);
  });

  test('getPageList returns correct pages', () => {
    const el = document.createElement('simple-pagination');
    const result = el.getPageList(1, 3);
    assert.deepEqual(result, [1, 2, 3]);
  });

  test('initializes with default values', async () => {
    const el = await fixture(html`<simple-pagination></simple-pagination>`);
    assert.equal(el.page, 1);
    assert.equal(el.totalPages, 1);
  });
});
