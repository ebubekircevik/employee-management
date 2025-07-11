export const TranslatableMixin = (Base) =>
  class extends Base {
    connectedCallback() {
      super.connectedCallback();
      window.addEventListener(
        'language-changed',
        (this._langChanged = () => this.requestUpdate())
      );
    }
    disconnectedCallback() {
      window.removeEventListener('language-changed', this._langChanged);
      super.disconnectedCallback();
    }
  };
