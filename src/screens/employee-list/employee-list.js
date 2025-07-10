import {LitElement, html} from 'lit';
import {employeeListStyles} from './employee-list.css.js';
import '../../_shared/simple-pagination/simple-pagination.js';

export class EmployeeList extends LitElement {
  static styles = [employeeListStyles];
  static properties = {
    rowData: {type: Array},
    headers: {type: Array},
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
    this.viewType = 'table';
    this.search = '';
    this.page = 1;
    this.selectedRows = [];
    this.allSelected = false;
  }

  toggleSelectAll(e) {
    const checked = e.target.checked;
    this.allSelected = checked;
    if (checked) {
      this.selectedRows = this.rowData.map((row) => row.id);
    } else {
      this.selectedRows = [];
    }
  }

  toggleRowSelect(e, row) {
    if (e.target.checked) {
      this.selectedRows = [...this.selectedRows, row.id];
    } else {
      this.selectedRows = this.selectedRows.filter((id) => id !== row.id);
    }
    this.allSelected = this.selectedRows.length === this.rowData.length;
  }

  onPageChange(e) {
    this.page = e.detail.page;
    // Burada sayfa değişiminde veri güncelleyebilirsin
    // Örneğin: this.fetchPageData(this.page);
  }

  render() {
    console.log(this.selectedRows);
    return html`
      <div class="employee-list-container">
        <div class="header-container">
          <p>Employee List</p>
        </div>
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
                ${this.headers.map((header) => html`<td>${header}</td>`)}
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              ${this.rowData.map(
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
                      title="Edit"
                      @click=${() => this.editRow(row)}
                      class="icon"
                    >
                      <img
                        src="/src/_assets/icons/edit_square.svg"
                        alt="Edit"
                        width="24"
                        height="24"
                        style="vertical-align:middle;"
                      />
                    </button>
                    <button
                      title="Delete"
                      @click=${() => this.deleteRow(row)}
                      class="icon"
                    >
                      <img
                        src="/src/_assets/icons/delete.svg"
                        alt="Delete"
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
          <simple-pagination
            .page=${this.page}
            .totalPages=${20}
            @page-change=${this.onPageChange}
          ></simple-pagination>
        </div>
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

customElements.define('employee-list', EmployeeList);
