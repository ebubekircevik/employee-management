import {LitElement, html} from 'lit';
import {employeeListStyles} from './employee-list.css.js';
import '../../_components/list-app/list-app.js';
import '../../_components/grid-app/grid-app.js';
import '../../_shared/simple-pagination/simple-pagination.js';
import {employeeData} from '../../mockDataEmployee.js';
import {getObjectKeys} from '../../helperFunctions.js';
import {t} from '../../i18n.js';
import {TranslatableMixin} from '../../_mixins/TranslatableMixin.js';

export class EmployeeList extends TranslatableMixin(LitElement) {
  static styles = [employeeListStyles];
  static properties = {
    isListView: {type: Boolean},
  };

  constructor() {
    super();
    this.isListView = true;
  }

  render() {
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
              .rowData=${employeeData}
              .headers=${getObjectKeys(employeeData[0])}
            ></list-app>`
          : html`<grid-app
              .rowData=${employeeData}
              .headers=${getObjectKeys(employeeData[0])}
            ></grid-app>`}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
