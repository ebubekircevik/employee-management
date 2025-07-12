import {ConfirmDialog} from '../src/_shared/confirm-dialog/confirm-dialog.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('confirm-dialog', () => {
  test('is defined', () => {
    const el = document.createElement('confirm-dialog');
    assert.instanceOf(el, ConfirmDialog);
  });

  test('renders dialog when open', async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    el.isOpen = true;
    el.employee = {firstName: 'John', lastName: 'Doe'};
    await el.updateComplete;

    const dialog = el.shadowRoot.querySelector('.dialog');
    assert.exists(dialog);
  });

  test('does not render when closed', async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    el.isOpen = false;
    await el.updateComplete;

    const dialog = el.shadowRoot.querySelector('.dialog');
    assert.notExists(dialog);
  });

  test('dispatches confirm event', async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    el.isOpen = true;
    el.employee = {firstName: 'John', lastName: 'Doe'};
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('confirm', (e) => {
      eventFired = true;
      assert.deepEqual(e.detail, el.employee);
    });

    const proceedBtn = el.shadowRoot.querySelector('.proceed-btn');
    proceedBtn.click();

    assert.isTrue(eventFired);
  });

  test('dispatches cancel event', async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    el.isOpen = true;
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('cancel', () => {
      eventFired = true;
    });

    const cancelBtn = el.shadowRoot.querySelector('.cancel-btn');
    cancelBtn.click();

    assert.isTrue(eventFired);
  });

  test('initializes with default values', async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    assert.isNull(el.employee);
    assert.isFalse(el.isOpen);
  });
});
