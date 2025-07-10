import {LitElement, html} from 'lit';
import {employeeFormStyles} from './employee-form.css.js';
import {employeeData} from '../../mockDataEmployee.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
    mode: {type: String},
  };

  static styles = employeeFormStyles;

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.mode = 'new';
  }

  onBeforeEnter(location) {
    const id = location.params.id;
    if (id) {
      const found = employeeData.find((emp) => String(emp.id) === String(id));
      if (found) {
        this.employee = {...found};
        this.mode = 'edit';
      }
    } else {
      this.employee = {
        firstName: '',
        lastName: '',
        dateOfEmployment: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        department: '',
        position: '',
      };
      this.mode = 'new';
    }
  }

  handleInput(e) {
    const {name, value} = e.target;
    this.employee = {...this.employee, [name]: value};
  }

  handleSubmit(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('save', {
        detail: this.employee,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleCancel() {
    this.dispatchEvent(
      new CustomEvent('cancel', {bubbles: true, composed: true})
    );
  }

  render() {
    return html`
      <div class="outer-container">
        <div class="header-container">
          <p>${this.mode === 'edit' ? 'Edit Employee' : 'Add Employee'}</p>
        </div>
        <form class="form-container" @submit=${this.handleSubmit}>
          <div class="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              .value=${this.employee.firstName}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              .value=${this.employee.lastName}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>Date of Employment</label>
            <input
              name="dateOfEmployment"
              type="date"
              .value=${this.employee.dateOfEmployment}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>Date of Birth</label>
            <input
              name="dateOfBirth"
              type="date"
              .value=${this.employee.dateOfBirth}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input
              name="phone"
              .value=${this.employee.phone}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              .value=${this.employee.email}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>Department</label>

            <select
              name="department"
              .value=${this.employee.department}
              @change=${this.handleInput}
              required
            >
              <option value="">Please Select</option>
              <option value="Analytics">Analytics</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
          <div class="form-group">
            <label>Position</label>
            <select
              name="position"
              .value=${this.employee.position}
              @change=${this.handleInput}
              required
            >
              <option value="">Please Select</option>
              <option value="Junior">Junior</option>
              <option value="Medior">Medior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div class="form-group"></div>
          <div class="form-actions">
            <button type="submit" class="save-btn">Save</button>
            <button
              type="button"
              class="cancel-btn"
              @click=${this.handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
