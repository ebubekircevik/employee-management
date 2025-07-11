import {LitElement, html} from 'lit';
import {mainNavbarStyles} from './main-navbar.css.js';
import {t} from '../../i18n.js';
import {TranslatableMixin} from '../../_mixins/TranslatableMixin.js';

const LANGUAGES = [
  {code: 'tr', label: 'Türkçe', flag: '🇹🇷'},
  {code: 'en', label: 'English', flag: '🇺🇸'},
];

export class MainNavbar extends TranslatableMixin(LitElement) {
  static styles = mainNavbarStyles;
  static properties = {
    lang: {type: String},
    langDropdownOpen: {type: Boolean},
    selectedLang: {type: Object},
  };

  constructor() {
    super();
    this.lang = document.documentElement.lang || 'en';
    this.langDropdownOpen = false;
    this.selectedLang = LANGUAGES.find((l) => l.code === this.lang);
  }

  selectLang(code) {
    document.documentElement.lang = code;
    this.selectedLang = LANGUAGES.find((l) => l.code === code);
    this.langDropdownOpen = false;
    window.dispatchEvent(new Event('language-changed'));
  }

  render() {
    console.log(this.selectedLang)
    return html`
      <nav class="navbar">
        <a class="navbar-left" href="/">
          <div class="navbar-logo">
            <img src="/src/_assets/icons/ing-logo.png" alt="ING logo" />
          </div>
          <span class="navbar-title">ING</span>
        </a>
        <div class="navbar-right">
          <a class="nav-link" href="/">
            <img src="/src/_assets/icons/employee.svg" alt="employee logo" />
            ${t('employees')}
          </a>
          <a class="nav-link add" href="/edit/new">
            <img src="/src/_assets/icons/plus.svg" alt="plus logo" />
            ${t('addNew')}
          </a>
          <div style="position:relative;">
            <button
              class="lang-btn"
              @click="${() => (this.langDropdownOpen = !this.langDropdownOpen)}"
            >
              <span style="font-size:1.1em;">${this.selectedLang.flag}</span>
            </button>
            ${this.langDropdownOpen
              ? html`
                  <div class="lang-dropdown">
                    ${LANGUAGES.map(
                      (lang) => html`
                        <div
                          class="lang-dropdown-item${this.lang === lang.code
                            ? ' selected'
                            : ''}"
                          @click="${() => this.selectLang(lang.code)}"
                        >
                          <span style="font-size:1.1em;">${lang.flag}</span>
                          ${lang.label}
                        </div>
                      `
                    )}
                  </div>
                `
              : ''}
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('main-navbar', MainNavbar);
