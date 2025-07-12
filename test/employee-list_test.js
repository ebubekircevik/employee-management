import {EmployeeList} from '../src/screens/employee-list/employee-list.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('employee-list', () => {
  test('is defined', () => {
    const el = document.createElement('employee-list');
    assert.instanceOf(el, EmployeeList);
  });

  test('renders employee list', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    assert.exists(el.shadowRoot.querySelector('.employee-list-container'));
  });

  test('shows employee data in list-app', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    el.employees = [{id: 1, firstName: 'John', lastName: 'Doe'}];
    await el.updateComplete;
    const listApp = el.shadowRoot.querySelector('list-app');
    assert.exists(listApp, 'list-app should be rendered');
    await listApp.updateComplete;
    assert.include(listApp.shadowRoot.textContent, 'John');
    assert.include(listApp.shadowRoot.textContent, 'Doe');
  });

  test('shows employees', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    el.employees = [{id: 1, firstName: 'John', lastName: 'Doe'}];
    await el.updateComplete;
    assert.exists(
      el.shadowRoot.querySelector('list-app') ||
        el.shadowRoot.querySelector('grid-app')
    );
  });

  test('toggles view', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    const gridBtn = el.shadowRoot.querySelector('img[alt="Grid View"]');
    gridBtn.click();
    await el.updateComplete;
    assert.isFalse(el.isListView);
  });

  test('renders no employees message and confirm-dialog when employees is empty', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    el.employees = [];
    await el.updateComplete;

    const noData = el.shadowRoot.querySelector('.no-data');
    assert.exists(noData, 'no-data div should exist');
    assert.match(noData.textContent, /No employees found|Çalışan bulunamadı/);

    const header = el.shadowRoot.querySelector('.header-container');
    assert.exists(header, 'header-container should exist');
    assert.match(header.textContent, /Employee List|Çalışan Listesi/);

    const confirmDialog = el.shadowRoot.querySelector('confirm-dialog');
    assert.exists(confirmDialog, 'confirm-dialog should be rendered');
  });
});
