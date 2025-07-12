import {LitElement, html} from 'lit';
import {confirmDialogStyles} from './confirm-dialog.css.js';
import {t} from '../../i18n.js';

export class ConfirmDialog extends LitElement {
  static styles = confirmDialogStyles;
  static properties = {
    employee: {type: Object},
    isOpen: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
    this.employee = null;
    this.isOpen = false;
  }

  _onProceed() {
    this.dispatchEvent(
      new CustomEvent('confirm', {
        detail: this.employee,
        bubbles: true,
        composed: true,
      })
    );
  }

  _onCancel() {
    this.dispatchEvent(
      new CustomEvent('cancel', {bubbles: true, composed: true})
    );
  }

  render() {
    if (!this.isOpen) return html``;
    const name = this.employee
      ? `${this.employee.firstName} ${this.employee.lastName}`
      : '';
    return html`
      <div class="overlay" @click=${this._onCancel}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <button class="close-btn" @click=${this._onCancel} title="Close">
            <img
              src="/src/_assets/icons/close.svg"
              alt="close"
              width="24"
              height="24"
            />
          </button>
          <div class="title">${t('areYouSure')}</div>
          <div class="desc">${t('deleteEmployeeConfirm', {name})}</div>
          <div class="actions">
            <button class="proceed-btn" @click=${this._onProceed}>
              ${t('proceed')}
            </button>
            <button class="cancel-btn" @click=${this._onCancel}>
              ${t('cancel')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
