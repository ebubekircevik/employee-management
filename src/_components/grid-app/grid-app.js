import {LitElement, html} from 'lit';
import {gridAppStyles} from './grid-app.css.js';
import '../../_shared/simple-pagination/simple-pagination.js';
import '../../_shared/employee-card/employee-card.js';
import {t} from '../../i18n.js';
import {TranslatableMixin} from '../../_mixins/TranslatableMixin.js';

export class GridApp extends TranslatableMixin(LitElement) {
  static styles = [gridAppStyles];
  static properties = {
    rowData: {type: Array},
    headers: {type: Array},
    rowsPerPage: {type: Number},
    viewType: {type: String},
    search: {type: String},
    page: {type: Number},
    selectedRows: {type: Array},
    allSelected: {type: Boolean},
  };

  constructor() {
    super();
    this.rowData = [];
    this.headers = [];
    this.rowsPerPage = 4;
    this.viewType = 'table';
    this.search = '';
    this.page = 1;
    this.selectedRows = [];
    this.allSelected = false;
  }

  toggleSelectAll(e) {
    const checked = e.target.checked;
    const currentPageIds = this.getCurrentPageRows().map((row) => row.id);

    if (checked) {
      let updatedSelectedRows = [...this.selectedRows];
      currentPageIds.forEach((id) => {
        if (!updatedSelectedRows.includes(id)) {
          updatedSelectedRows.push(id);
        }
      });
      this.selectedRows = updatedSelectedRows;
    } else {
      this.selectedRows = this.selectedRows.filter(
        (id) => !currentPageIds.includes(id)
      );
    }

    this.allSelected = this.getCurrentPageRows().every((row) =>
      this.selectedRows.includes(row.id)
    );
  }

  toggleRowSelect(e, row) {
    if (e.target.checked) {
      this.selectedRows = [...this.selectedRows, row.id];
    } else {
      this.selectedRows = this.selectedRows.filter((id) => id !== row.id);
    }
    this.allSelected = this.getCurrentPageRows().every((row) =>
      this.selectedRows.includes(row.id)
    );
  }

  onPageChange(e) {
    this.page = e.detail.page;
  }

  getCurrentPageRows() {
    const start = (this.page - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.rowData.slice(start, end);
  }

  render() {
    console.log(this.selectedRows);
    const currentRows = this.getCurrentPageRows();
    return html`
      <div>
        <div class="grid-container">
          ${currentRows.length === 0
            ? html`<div class="no-employees">${t('noEmployees')}</div>`
            : currentRows.map(
                (row) => html`
                  <employee-card
                    .row=${row}
                    @edit=${(e) => this.editRow(e.detail)}
                    @delete=${(e) => this.deleteRow(e.detail)}
                  ></employee-card>
                `
              )}
        </div>
        <simple-pagination
          style="margin-top: 1rem;"
          .page=${this.page}
          .totalPages=${Math.ceil(this.rowData.length / this.rowsPerPage)}
          @page-change=${this.onPageChange}
        ></simple-pagination>
      </div>
    `;
  }

  editRow(row) {
    // Düzenleme işlemi burada yapılacak
    console.log('Edit:', row);
  }

  deleteRow(row) {
    // Silme işlemi burada yapılacak
    console.log('Delete:', row);
  }
}

customElements.define('grid-app', GridApp);
