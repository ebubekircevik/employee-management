import {LitElement, html} from 'lit';
import {employeeFormStyles} from './employee-form.css.js';
import {employeeData} from '../../mockDataEmployee.js';
import {t} from '../../i18n.js';
import {I18nMixin} from '../../_mixins/I18nMixin.js';
import '../../_components/date-picker/date-picker.js';
import {toISODate} from '../../helperFunctions.js';
import '@vaadin/form-layout';
import '@vaadin/text-field';
import '@vaadin/email-field';
import '@vaadin/select';

export class EmployeeForm extends I18nMixin(LitElement) {
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
    if (!this.isFormValid()) {
      console.log('Form is not valid, submission prevented');
      return;
    }
    console.log('handleSubmit');
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

  isFormValid() {
    const hasRequiredFields = Object.keys(this.employee).every(
      (fieldName) =>
        !!(typeof this.employee[fieldName] === 'string'
          ? this.employee[fieldName].trim()
          : this.employee[fieldName])
    );

    const phoneRegex = /^\(90\)\s5\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
    const hasValidPhone =
      this.employee.phone === '' || phoneRegex.test(this.employee.phone);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail =
      this.employee.email.trim() === '' ||
      emailRegex.test(this.employee.email.trim());

    return hasRequiredFields && hasValidPhone && hasValidEmail;
  }

  render() {
    // console.log(this.employee);
    console.log(this.isFormValid());
    return html`
      <div class="outer-container">
        <div class="header-container">
          <p>${this.mode === 'edit' ? t('editEmployee') : t('addEmployee')}</p>
        </div>
        <form class="form-container" @submit=${this.handleSubmit}>
          <div class="form-group">
            <label>${t('firstName')}</label>
            <input
              name="firstName"
              .value=${this.employee.firstName}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>${t('lastName')}</label>
            <input
              name="lastName"
              .value=${this.employee.lastName}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>${t('dateOfEmployment')}</label>
            <date-picker
              .value=${toISODate(this.employee.dateOfEmployment)}
              .required=${true}
              @value-changed=${(e) =>
                (this.employee = {
                  ...this.employee,
                  dateOfEmployment: e.detail.value,
                })}
            ></date-picker>
          </div>
          <div class="form-group">
            <label>${t('dateOfBirth')}</label>
            <date-picker
              .value=${toISODate(this.employee.dateOfBirth)}
              .required=${true}
              @value-changed=${(e) =>
                (this.employee = {
                  ...this.employee,
                  dateOfBirth: e.detail.value,
                })}
            ></date-picker>
          </div>
          <div class="form-group">
            <label>${t('phone')}</label>
            <vaadin-text-field
              name="phone"
              .value=${this.employee.phone}
              @value-changed=${(e) => (this.employee.phone = e.detail.value)}
              required
              pattern="\\(90\\)\\s5\\d{2}\\s\\d{3}\\s\\d{2}\\s\\d{2}"
              placeholder="(90) 5xx xxx xx xx"
              error-message="${t('phoneValidationError')}"
              ?invalid=${this.employee.phone &&
              this.employee.phone.length > 0 &&
              !/^\(90\)\s5\d{2}\s\d{3}\s\d{2}\s\d{2}$/.test(
                this.employee.phone
              )}
            ></vaadin-text-field>
          </div>
          <div class="form-group">
            <label>${t('email')}</label>
            <input
              name="email"
              type="email"
              .value=${this.employee.email}
              @input=${this.handleInput}
              required
            />
          </div>
          <div class="form-group">
            <label>${t('department')}</label>
            <select
              class="custom-select"
              name="department"
              .value=${this.employee.department}
              @change=${this.handleInput}
              required
            >
              <option value="">${t('pleaseSelect')}</option>
              <option value="Analytics">Analytics</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
          <div class="form-group">
            <label>${t('position')}</label>
            <select
              class="custom-select"
              name="position"
              .value=${this.employee.position}
              @change=${this.handleInput}
              required
            >
              <option value="">${t('pleaseSelect')}</option>
              <option value="Junior">${t('junior')}</option>
              <option value="Medior">${t('medior')}</option>
              <option value="Senior">${t('senior')}</option>
            </select>
          </div>
          <div class="form-group"></div>
          <div class="form-actions">
            <button
              type="submit"
              class="save-btn"
              style="opacity: ${this.isFormValid() ? '1' : '0.5'}"
            >
              ${t('save')}
            </button>
            <button
              type="button"
              class="cancel-btn"
              @click=${this.handleCancel}
            >
              ${t('cancel')}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
