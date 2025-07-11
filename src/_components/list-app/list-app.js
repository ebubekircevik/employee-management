import {LitElement, html} from 'lit';
import {listAppStyles} from './list-app.css.js';
import '../../_shared/simple-pagination/simple-pagination.js';
import {Router} from '@vaadin/router';
import {t} from '../../i18n.js';
import {TranslatableMixin} from '../../_mixins/TranslatableMixin.js';

export class ListApp extends TranslatableMixin(LitElement) {
  static styles = [listAppStyles];
  static properties = {
    rowData: {type: Array},
    headers: {type: Array},
    rowsPerPage: {type: Number},
    viewType: {type: String}, // 'table' veya 'list'
    search: {type: String},
    page: {type: Number},
    selectedRows: {type: Array},
    allSelected: {type: Boolean},
  };

  constructor() {
    super();
    this.rowData = [];
    this.headers = [];
    this.rowsPerPage = 5;
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
    return html`
      <div>
        <div class="list-container">
          <table>
            <thead>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    .checked=${this.allSelected}
                    @change=${this.toggleSelectAll}
                  />
                </td>
                ${this.headers.map((header) => html`<td>${t(header)}</td>`)}
                <td>${t('actions')}</td>
              </tr>
            </thead>
            <tbody>
              ${this.getCurrentPageRows().map(
                (row) => html`<tr>
                  <td>
                    <input
                      type="checkbox"
                      .checked=${this.selectedRows.includes(row.id)}
                      @change=${(e) => this.toggleRowSelect(e, row)}
                    />
                  </td>
                  <td>${row.firstName}</td>
                  <td>${row.lastName}</td>
                  <td>${row.dateOfEmployment}</td>
                  <td>${row.dateOfBirth}</td>
                  <td>${row.phone}</td>
                  <td>${row.email}</td>
                  <td>${row.department}</td>
                  <td>${row.positon}</td>
                  <td>
                    <button
                      title="${t('edit')}"
                      @click=${() => this.editRow(row)}
                      class="icon"
                    >
                      <img
                        src="/src/_assets/icons/edit_square.svg"
                        alt="${t('edit')}"
                        width="24"
                        height="24"
                        style="vertical-align:middle;"
                      />
                    </button>
                    <button
                      title="${t('delete')}"
                      @click=${() => this.deleteRow(row)}
                      class="icon"
                    >
                      <img
                        src="/src/_assets/icons/delete.svg"
                        alt="${t('delete')}"
                        width="24"
                        height="24"
                        style="vertical-align:middle;"
                      />
                    </button>
                  </td>
                </tr>`
              )}
            </tbody>
          </table>
        </div>
        <hr style="border: 1px solid #f1ebeb;" />
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
    Router.go(`/edit/${row.id}`);
  }
  deleteRow(row) {
    console.log('Delete:', row);
  }
}

customElements.define('list-app', ListApp);
