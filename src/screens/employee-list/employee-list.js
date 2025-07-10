import {LitElement, html} from 'lit';
import {employeeListStyles} from './employee-list.css.js';
import '../../_components/list-app/list-app.js';
import '../../_shared/simple-pagination/simple-pagination.js';
import {employeeData} from '../../mockDataEmployee.js';
import {getObjectKeys} from '../../helperFunctions.js';

export class EmployeeList extends LitElement {
  static styles = [employeeListStyles];
  static properties = {
    // rowData: {type: Array},
    // headers: {type: Array},
    // search: {type: String},

    // page: {type: Number},
    isListView: {type: Boolean},
  };

  constructor() {
    super();
    // this.rowData = [];
    // this.headers = [];
    // this.search = '';
    // this.page = 1;
    this.isListView = true;
  }

  render() {
    return html`
      <div class="employee-list-container">
        <div class="header-container">
          <p>Employee List</p>
          <div class="view-toggle-icons">
            <img
              src="/src/_assets/icons/list_view.svg"
              alt="List View"
              width="24"
              height="24"
              style="cursor:pointer;"
              @click=${() => (this.isListView = true)}
            />
            <img
              src="/src/_assets/icons/grid_view.svg"
              alt="Grid View"
              width="24"
              height="24"
              style="cursor:pointer;"
              @click=${() => (this.isListView = false)}
            />
          </div>
        </div>
        ${this.isListView
          ? html`<list-app
              .rowData=${employeeData}
              .headers=${getObjectKeys(employeeData[0])}
            ></list-app>`
          : html`<div>test</div>`}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
