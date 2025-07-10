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
  };

  constructor() {
    super();
    // this.rowData = [];
    // this.headers = [];
    // this.search = '';
    // this.page = 1;
  }

  render() {
    return html`
      <div class="employee-list-container">
        <div class="header-container">
          <p>Employee List</p>
        </div>
        <list-app
          .rowData=${employeeData}
          .headers=${getObjectKeys(employeeData[0])}
        ></list-app>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
