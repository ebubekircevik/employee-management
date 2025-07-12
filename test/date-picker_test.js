import {DatePicker} from '../src/_components/date-picker/date-picker.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('date-picker', () => {
  test('is defined', () => {
    const el = document.createElement('date-picker');
    assert.instanceOf(el, DatePicker);
  });

  test('renders vaadin-date-picker', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);
    const datePicker = el.shadowRoot.querySelector('vaadin-date-picker');
    assert.exists(datePicker);
  });

  test('dispatches value-changed event', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);

    let eventFired = false;
    el.addEventListener('value-changed', (e) => {
      eventFired = true;
      assert.property(e.detail, 'value');
    });

    const datePicker = el.shadowRoot.querySelector('vaadin-date-picker');
    datePicker.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {value: '2020-01-01'},
      })
    );

    assert.isTrue(eventFired);
  });

  test('initializes with default values', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);
    assert.equal(el.value, '');
    assert.equal(el.label, '');
    assert.equal(el.placeholder, '');
    assert.isFalse(el.required);
    assert.isFalse(el.disabled);
  });

  test('sets properties correctly', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);
    el.value = '2020-01-01';
    el.label = 'Test Label';
    el.required = true;
    await el.updateComplete;

    const datePicker = el.shadowRoot.querySelector('vaadin-date-picker');
    assert.equal(datePicker.value, '2020-01-01');
    assert.equal(datePicker.label, 'Test Label');
    assert.isTrue(datePicker.required);
  });
});
