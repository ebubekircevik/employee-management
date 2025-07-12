import {html} from 'lit';
import {BaseComponent} from '../../_base/BaseComponent.js';
import {StoreMixin} from '../../_mixins/StoreMixin.js';
import {employeeStore} from '../../stores/employeeStore.js';
import {employeeListStyles} from './employee-list.css.js';
import '../../_components/list-app/list-app.js';
import '../../_components/grid-app/grid-app.js';
import '../../_shared/simple-pagination/simple-pagination.js';
import {getObjectKeys} from '../../helperFunctions.js';
import {t} from '../../i18n.js';

export class EmployeeList extends StoreMixin(BaseComponent) {
  static styles = [employeeListStyles];
  static properties = {
    isListView: {type: Boolean},
    employees: {type: Array},
  };

  constructor() {
    super();
    this.isListView = true;
    this.employees = [];
    this.store = employeeStore;
  }

  connectedCallback() {
    super.connectedCallback();
    this.employees = this.getEmployees();
  }

  _onStoreUpdate(data) {
    this.employees = data;
    this.requestUpdate();
  }

  render() {
    if (this.employees.length === 0) {
      return html`
        <div class="employee-list-container">
          <div class="header-container">
            <p>${t('employeeList')}</p>
          </div>
          <div class="no-data">
            <p>${t('noEmployees')}</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="employee-list-container">
        <div class="header-container">
          <p>${t('employeeList')}</p>
          <div class="view-toggle-icons">
            <img
              src="/src/_assets/icons/list_view.svg"
              alt="${t('listView')}"
              width="24"
              height="24"
              style="cursor:pointer;"
              @click=${() => (this.isListView = true)}
            />
            <img
              src="/src/_assets/icons/grid_view.svg"
              alt="${t('gridView')}"
              width="24"
              height="24"
              style="cursor:pointer;"
              @click=${() => (this.isListView = false)}
            />
          </div>
        </div>
        ${this.isListView
          ? html`<list-app
              .rowData=${this.employees}
              .headers=${getObjectKeys(this.employees[0])}
            ></list-app>`
          : html`<grid-app
              .rowData=${this.employees}
              .headers=${getObjectKeys(this.employees[0])}
            ></grid-app>`}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
