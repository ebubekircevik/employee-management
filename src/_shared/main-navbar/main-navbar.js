import {LitElement, html} from 'lit';
import {mainNavbarStyles} from './main-navbar.css.js';

const LANGUAGES = [
  {code: 'tr', label: 'Türkçe', flag: '🇹🇷'},
  {code: 'en', label: 'English', flag: '🇺🇸'},
];

export class MainNavbar extends LitElement {
  static styles = mainNavbarStyles;
  static properties = {
    lang: {type: String},
    langDropdownOpen: {type: Boolean},
  };

  constructor() {
    super();
    this.lang = 'tr';
    this.langDropdownOpen = false;
  }

  toggleLangDropdown() {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  selectLang(code) {
    this.lang = code;
    this.langDropdownOpen = false;
  }

  render() {
    const selectedLang = LANGUAGES.find((l) => l.code === this.lang);
    return html`
      <nav class="navbar">
        <div class="navbar-left">
          <div class="navbar-logo">
            <img src="/src/_assets/icons/ing-logo.png" alt="ING logo" />
          </div>
          <span class="navbar-title">ING</span>
        </div>
        <div class="navbar-right">
          <a class="nav-link" href="/">
            <img src="/src/_assets/icons/employee.svg" alt="employee logo" />
            Employees
          </a>
          <a class="nav-link add" href="/edit/new">
            <img src="/src/_assets/icons/plus.svg" alt="plus logo" />
            Add New
          </a>
          <div style="position:relative;">
            <button class="lang-btn" @click="${this.toggleLangDropdown}">
              <span style="font-size:1.1em;">${selectedLang.flag}</span>
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
