import {EmployeeCard} from '../src/_shared/employee-card/employee-card.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('employee-card', () => {
  test('is defined', () => {
    const el = document.createElement('employee-card');
    assert.instanceOf(el, EmployeeCard);
  });

  test('renders employee card', async () => {
    const el = await fixture(html`<employee-card></employee-card>`);
    const card = el.shadowRoot.querySelector('.employee-card');
    assert.exists(card);
  });

  test('displays employee data', async () => {
    const el = await fixture(html`<employee-card></employee-card>`);
    el.row = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '01/01/2020',
      dateOfBirth: '01/01/1990',
      phone: '(90) 555 123 45 67',
      email: 'john@example.com',
      department: 'Tech',
      position: 'Senior',
    };
    await el.updateComplete;

    assert.include(el.shadowRoot.textContent, 'John');
    assert.include(el.shadowRoot.textContent, 'Doe');
    assert.include(el.shadowRoot.textContent, 'Tech');
  });

  test('dispatches edit event', async () => {
    const el = await fixture(html`<employee-card></employee-card>`);
    el.row = {firstName: 'John', lastName: 'Doe'};
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('edit', (e) => {
      eventFired = true;
      assert.deepEqual(e.detail, el.row);
    });

    const editBtn = el.shadowRoot.querySelector('.edit-btn');
    editBtn.click();

    assert.isTrue(eventFired);
  });

  test('dispatches delete event', async () => {
    const el = await fixture(html`<employee-card></employee-card>`);
    el.row = {firstName: 'John', lastName: 'Doe'};
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('delete', (e) => {
      eventFired = true;
      assert.deepEqual(e.detail, el.row);
    });

    const deleteBtn = el.shadowRoot.querySelector('.delete-btn');
    deleteBtn.click();

    assert.isTrue(eventFired);
  });

  test('initializes with empty row', async () => {
    const el = await fixture(html`<employee-card></employee-card>`);
    assert.deepEqual(el.row, {});
  });
});
