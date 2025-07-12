import {EmployeeForm} from '../src/screens/employee-form/employee-form.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('employee-form', () => {
  test('is defined', () => {
    const el = document.createElement('employee-form');
    assert.instanceOf(el, EmployeeForm);
  });

  test('renders form with all fields', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const form = el.shadowRoot.querySelector('.form-container');

    assert.exists(form.querySelector('input[name="firstName"]'));
    assert.exists(form.querySelector('input[name="lastName"]'));
    assert.exists(form.querySelector('input[name="email"]'));
    assert.exists(form.querySelector('select[name="department"]'));
  });

  test('handles input changes', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const firstNameInput = el.shadowRoot.querySelector(
      'input[name="firstName"]'
    );

    firstNameInput.value = 'John';
    firstNameInput.dispatchEvent(new Event('input'));

    assert.equal(el.employee.firstName, 'John');
  });

  test('validates form correctly', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    // Invalid form
    el.employee = {
      firstName: '',
      lastName: 'Doe',
      dateOfEmployment: '01/01/2020',
      dateOfBirth: '01/01/1990',
      phone: '(90) 555 123 45 67',
      email: 'john@example.com',
      department: 'Tech',
      position: 'Senior',
    };
    await el.updateComplete;
    assert.isFalse(el.isFormValid());

    // Valid form
    el.employee.firstName = 'John';
    await el.updateComplete;
    assert.isTrue(el.isFormValid());
  });

  test('dispatches save event', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el.employee = {
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

    let saveEventFired = false;
    el.addEventListener('save', () => {
      saveEventFired = true;
    });

    // Test handleSubmit directly to avoid navigation issues
    const mockEvent = {preventDefault: () => {}};
    el.handleSubmit(mockEvent);

    assert.isTrue(saveEventFired);
  });

  test('shows correct header based on mode', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    // New mode
    el.mode = 'new';
    await el.updateComplete;
    const header = el.shadowRoot.querySelector('.header-container p');
    assert.include(header.textContent, 'Add Employee');

    // Edit mode
    el.mode = 'edit';
    await el.updateComplete;
    assert.include(header.textContent, 'Edit Employee');
  });
});
