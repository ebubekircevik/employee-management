import {LitElement} from 'lit';

export class BaseComponent extends LitElement {
  constructor() {
    super();
    this._langChanged = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscribeToLanguageChanges();
  }

  disconnectedCallback() {
    if (this._langChanged) {
      window.removeEventListener('language-changed', this._langChanged);
      this._langChanged = null;
    }
    super.disconnectedCallback();
  }

  // Language change subscription
  _subscribeToLanguageChanges() {
    this._langChanged = () => this.requestUpdate();
    window.addEventListener('language-changed', this._langChanged);
  }
}
