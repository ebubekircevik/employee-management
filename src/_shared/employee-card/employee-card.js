import {LitElement, html} from 'lit';
import {employeeCardStyles} from './employee-card.css.js';

export class EmployeeCard extends LitElement {
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
            <div class="label">First Name:</div>
            <div class="value">${row.firstName}</div>
          </div>
          <div>
            <div class="label">Last Name:</div>
            <div class="value">${row.lastName}</div>
          </div>
          <div>
            <div class="label">Date of Employment:</div>
            <div class="value">${row.dateOfEmployment}</div>
          </div>
          <div>
            <div class="label">Date of Birth:</div>
            <div class="value">${row.dateOfBirth}</div>
          </div>
          <div>
            <div class="label">Phone:</div>
            <div class="value">${row.phone}</div>
          </div>
          <div>
            <div class="label">Email:</div>
            <div class="value">${row.email}</div>
          </div>
          <div>
            <div class="label">Department:</div>
            <div class="value">${row.department}</div>
          </div>
          <div>
            <div class="label">Position:</div>
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
              alt="Edit"
              width="24"
              height="24"
              style="vertical-align:middle;"
            />Edit
          </button>
          <button
            class="delete-btn"
            @click=${() =>
              this.dispatchEvent(new CustomEvent('delete', {detail: row}))}
          >
          <img
              src="/src/_assets/icons/delete_white.svg"
              alt="Delete"
              width="24"
              height="24"
              style="vertical-align:middle;"
            /> Delete
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-card', EmployeeCard);
