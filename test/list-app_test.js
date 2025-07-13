import {ListApp} from '../src/_components/list-app/list-app.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('list-app', () => {
  test('is defined', () => {
    const el = document.createElement('list-app');
    assert.instanceOf(el, ListApp);
  });

  test('renders list container', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    const container = el.shadowRoot.querySelector('.list-container');
    assert.exists(container);
  });

  test('renders table with headers', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    el.headers = ['firstName', 'lastName', 'department'];
    await el.updateComplete;

    const table = el.shadowRoot.querySelector('table');
    const headerCells = el.shadowRoot.querySelectorAll('thead td');
    assert.exists(table);
    assert.isTrue(headerCells.length > 0);
  });

  test('renders employee rows', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe', department: 'Tech'},
      {id: 2, firstName: 'Jane', lastName: 'Smith', department: 'HR'},
    ];
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    assert.equal(rows.length, 2);
  });

  test('dispatches delete-request event', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    el.rowData = [{id: 1, firstName: 'John', lastName: 'Doe'}];
    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('delete-request', (e) => {
      eventFired = true;
      assert.deepEqual(e.detail, el.rowData[0]);
    });

    el.deleteRow(el.rowData[0]);

    assert.isTrue(eventFired);
  });

  test('handles select all toggle', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Jane', lastName: 'Smith'},
    ];
    await el.updateComplete;

    const selectAllCheckbox = el.shadowRoot.querySelector(
      'thead input[type="checkbox"]'
    );
    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event('change'));

    assert.deepEqual(el.selectedRows, [1, 2]);
    assert.isTrue(el.allSelected);
  });

  test('initializes with default values', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    assert.deepEqual(el.rowData, []);
    assert.deepEqual(el.headers, []);
    assert.equal(el.rowsPerPage, 10);
    assert.equal(el.page, 1);
  });

  test('handles page change', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Jane', lastName: 'Smith'},
      {id: 3, firstName: 'Bob', lastName: 'Johnson'},
      {id: 4, firstName: 'Alice', lastName: 'Brown'},
      {id: 5, firstName: 'Charlie', lastName: 'Wilson'},
      {id: 6, firstName: 'David', lastName: 'Miller'},
    ];
    await el.updateComplete;

    el.onPageChange({detail: {page: 2}});
    assert.equal(el.page, 2);
  });

  test('getCurrentPageRows returns correct rows', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Jane', lastName: 'Smith'},
      {id: 3, firstName: 'Bob', lastName: 'Johnson'},
      {id: 4, firstName: 'Alice', lastName: 'Brown'},
      {id: 5, firstName: 'Charlie', lastName: 'Wilson'},
      {id: 6, firstName: 'David', lastName: 'Miller'},
    ];
    el.page = 1;
    await el.updateComplete;

    const currentRows = el.getCurrentPageRows();
    assert.equal(currentRows.length, 6);
    assert.equal(currentRows[0].id, 1);
  });

  test('handles toggle row select', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    el.rowData = [{id: 1, firstName: 'John', lastName: 'Doe'}];
    await el.updateComplete;

    el.toggleRowSelect({target: {checked: true}}, el.rowData[0]);
    assert.deepEqual(el.selectedRows, [1]);

    el.toggleRowSelect({target: {checked: false}}, el.rowData[0]);
    assert.deepEqual(el.selectedRows, []);
  });

  test('handles select all with existing selections', async () => {
    const el = await fixture(html`<list-app></list-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Jane', lastName: 'Smith'},
    ];
    el.selectedRows = [3]; // Existing selection from other page
    await el.updateComplete;

    el.toggleSelectAll({target: {checked: true}});
    assert.deepEqual(el.selectedRows, [3, 1, 2]);
  });
});
