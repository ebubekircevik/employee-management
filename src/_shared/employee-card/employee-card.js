import {LitElement, html} from 'lit';
import {employeeCardStyles} from './employee-card.css.js';
import {t} from '../../i18n.js';
import {TranslatableMixin} from '../../_mixins/TranslatableMixin.js';

export class EmployeeCard extends TranslatableMixin(LitElement) {
  static properties = {
    row: {type: Object},
  };

  static styles = [employeeCardStyles];

  constructor() {
    super();
    this.row = {};
  }

  render() {
    const row = this.row;
    return html`
      <div class="employee-card">
        <div class="card-grid">
          <div>
            <div class="label">${t('firstName')}:</div>
            <div class="value">${row.firstName}</div>
          </div>
          <div>
            <div class="label">${t('lastName')}:</div>
            <div class="value">${row.lastName}</div>
          </div>
          <div>
            <div class="label">${t('dateOfEmployment')}:</div>
            <div class="value">${row.dateOfEmployment}</div>
          </div>
          <div>
            <div class="label">${t('dateOfBirth')}:</div>
            <div class="value">${row.dateOfBirth}</div>
          </div>
          <div>
            <div class="label">${t('phone')}:</div>
            <div class="value">${row.phone}</div>
          </div>
          <div>
            <div class="label">${t('email')}:</div>
            <div class="value">${row.email}</div>
          </div>
          <div>
            <div class="label">${t('department')}:</div>
            <div class="value">${row.department}</div>
          </div>
          <div>
            <div class="label">${t('position')}:</div>
            <div class="value">${row.positon}</div>
          </div>
        </div>
        <div class="card-actions">
          <button
            class="edit-btn"
            @click=${() =>
              this.dispatchEvent(new CustomEvent('edit', {detail: row}))}
          >
            <img
              src="/src/_assets/icons/edit_square_white.svg"
              alt="${t('edit')}"
              width="24"
              height="24"
              style="vertical-align:middle;"
            />${t('edit')}
          </button>
          <button
            class="delete-btn"
            @click=${() =>
              this.dispatchEvent(new CustomEvent('delete', {detail: row}))}
          >
            <img
              src="/src/_assets/icons/delete_white.svg"
              alt="${t('delete')}"
              width="24"
              height="24"
              style="vertical-align:middle;"
            />
            ${t('delete')}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-card', EmployeeCard);
