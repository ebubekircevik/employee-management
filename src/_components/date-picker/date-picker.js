import {BaseComponent} from '../../_base/BaseComponent.js';
import {html} from 'lit';
import {datePickerStyles} from './date-picker.css.js';
import '@vaadin/date-picker';
import {fromISODate} from '../../helperFunctions.js';
import {t} from '../../i18n.js';

const i18nTr = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  weekdays: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  weekdaysShort: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  firstDayOfWeek: 1,
  week: 'Hafta',
  calendar: 'Takvim',
  clear: 'Temizle',
  today: 'Bugün',
  cancel: 'İptal',
  formatDate: (dateObj) => {
    if (!dateObj || typeof dateObj !== 'object') return '';
    const day = String(dateObj.day).padStart(2, '0');
    const month = String(dateObj.month + 1).padStart(2, '0');
    const year = String(dateObj.year);
    return `${day}/${month}/${year}`;
  },
  parseDate: (text) => {
    const [day, month, year] = text.split('/');
    return {day: Number(day), month: Number(month) - 1, year: Number(year)};
  },
};

const i18nEn = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  firstDayOfWeek: 0,
  week: 'Week',
  calendar: 'Calendar',
  clear: 'Clear',
  today: 'Today',
  cancel: 'Cancel',
  formatDate: (dateObj) => {
    if (!dateObj || typeof dateObj !== 'object') return '';
    const day = String(dateObj.day).padStart(2, '0');
    const month = String(dateObj.month + 1).padStart(2, '0');
    const year = String(dateObj.year);
    return `${day}/${month}/${year}`;
  },
  parseDate: (text) => {
    const [day, month, year] = text.split('/');
    return {day: Number(day), month: Number(month) - 1, year: Number(year)};
  },
};

function getCurrentLang() {
  return document.documentElement.lang || 'en';
}

export class DatePicker extends BaseComponent {
  static properties = {
    value: {type: String},
    label: {type: String},
    placeholder: {type: String},
    required: {type: Boolean},
    disabled: {type: Boolean},
  };

  static styles = datePickerStyles;

  constructor() {
    super();
    this.value = '';
    this.label = '';
    this.placeholder = '';
    this.required = false;
    this.disabled = false;
  }

  get _i18n() {
    return getCurrentLang() === 'tr' ? i18nTr : i18nEn;
  }

  render() {
    return html`
      <vaadin-date-picker
        .value=${this.value}
        .label=${this.label || ''}
        .placeholder=${this.placeholder ||
        (getCurrentLang() === 'tr' ? 'gg/aa/yyyy' : 'dd/mm/yyyy')}
        .i18n=${this._i18n}
        ?required=${this.required}
        ?disabled=${this.disabled}
        error-message="${this.required ? t('requiredFieldError') : ''}"
        ?invalid=${this.required && !this.value}
        @value-changed=${(e) => this._onValueChanged(e)}
      ></vaadin-date-picker>
    `;
  }

  _onValueChanged(e) {
    if (e.detail.value) {
      this.value = e.detail.value;
      this.dispatchEvent(
        new CustomEvent('value-changed', {
          detail: {value: fromISODate(this.value)},
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

customElements.define('date-picker', DatePicker);
