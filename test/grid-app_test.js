import {GridApp} from '../src/_components/grid-app/grid-app.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('grid-app', () => {
  test('is defined', () => {
    const el = document.createElement('grid-app');
    assert.instanceOf(el, GridApp);
  });

  test('renders grid container', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
    const container = el.shadowRoot.querySelector('.grid-container');
    assert.exists(container);
  });

  test('shows no employees message when empty', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
    el.rowData = [];
    await el.updateComplete;

    const noEmployees = el.shadowRoot.querySelector('.no-employees');
    assert.exists(noEmployees);
  });

  test('renders employee cards', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Jane', lastName: 'Smith'},
    ];
    await el.updateComplete;

    const cards = el.shadowRoot.querySelectorAll('employee-card');
    assert.equal(cards.length, 2);
  });

  test('dispatches delete-request event', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
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

  test('initializes with default values', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
    assert.deepEqual(el.rowData, []);
    assert.deepEqual(el.headers, []);
    assert.equal(el.rowsPerPage, 4);
    assert.equal(el.page, 1);
  });

  test('handles page change', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Jane', lastName: 'Smith'},
      {id: 3, firstName: 'Bob', lastName: 'Johnson'},
      {id: 4, firstName: 'Alice', lastName: 'Brown'},
      {id: 5, firstName: 'Charlie', lastName: 'Wilson'},
    ];
    await el.updateComplete;

    el.onPageChange({detail: {page: 2}});
    assert.equal(el.page, 2);
  });

  test('getCurrentPageRows returns correct rows', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Jane', lastName: 'Smith'},
      {id: 3, firstName: 'Bob', lastName: 'Johnson'},
      {id: 4, firstName: 'Alice', lastName: 'Brown'},
      {id: 5, firstName: 'Charlie', lastName: 'Wilson'},
    ];
    el.page = 2;
    await el.updateComplete;

    const currentRows = el.getCurrentPageRows();
    assert.equal(currentRows.length, 1);
    assert.equal(currentRows[0].id, 5);
  });

  test('handles toggle select all', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
    el.rowData = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Jane', lastName: 'Smith'},
    ];
    await el.updateComplete;

    el.toggleSelectAll({target: {checked: true}});
    assert.deepEqual(el.selectedRows, [1, 2]);
    assert.isTrue(el.allSelected);

    el.toggleSelectAll({target: {checked: false}});
    assert.deepEqual(el.selectedRows, []);
    assert.isFalse(el.allSelected);
  });

  test('handles toggle row select', async () => {
    const el = await fixture(html`<grid-app></grid-app>`);
    el.rowData = [{id: 1, firstName: 'John', lastName: 'Doe'}];
    await el.updateComplete;

    el.toggleRowSelect({target: {checked: true}}, el.rowData[0]);
    assert.deepEqual(el.selectedRows, [1]);

    el.toggleRowSelect({target: {checked: false}}, el.rowData[0]);
    assert.deepEqual(el.selectedRows, []);
  });
});
