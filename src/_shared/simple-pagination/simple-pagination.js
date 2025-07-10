import {LitElement, html} from 'lit';
import {simplePaginationStyles} from './simple-pagination.css';

export class SimplePagination extends LitElement {
  static styles = [simplePaginationStyles];

  static properties = {
    page: {type: Number},
    totalPages: {type: Number},
  };

  constructor() {
    super();
    this.page = 1;
    this.totalPages = 1;
  }

  setPage(newPage) {
    if (newPage < 1 || newPage > this.totalPages || newPage === this.page)
      return;
    this.page = newPage;
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {page: this.page},
        bubbles: true,
        composed: true,
      })
    );
  }

  getPageList(page, totalPages, maxLength = 7) {
    if (maxLength < 5) throw new Error('maxLength must be at least 5');
    if (totalPages <= maxLength) {
      return Array.from({length: totalPages}, (_, i) => i + 1);
    }
    const sideWidth = maxLength < 9 ? 1 : 2;
    const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    const rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      return [
        ...Array.from({length: maxLength - sideWidth - 1}, (_, i) => i + 1),
        '...',
        ...Array.from(
          {length: sideWidth},
          (_, i) => totalPages - sideWidth + 1 + i
        ),
      ];
    }
    if (page >= totalPages - sideWidth - 1 - leftWidth) {
      return [
        ...Array.from({length: sideWidth}, (_, i) => i + 1),
        '...',
        ...Array.from(
          {length: maxLength - sideWidth - 1},
          (_, i) => totalPages - (maxLength - sideWidth - 2) + i
        ),
      ];
    }
    return [
      ...Array.from({length: sideWidth}, (_, i) => i + 1),
      '...',
      ...Array.from(
        {length: leftWidth + rightWidth + 1},
        (_, i) => page - leftWidth + i
      ),
      '...',
      ...Array.from(
        {length: sideWidth},
        (_, i) => totalPages - sideWidth + 1 + i
      ),
    ];
  }

  render() {
    const pages = this.getPageList(this.page, this.totalPages, 7);
    return html`
      <button
        @click=${() => this.setPage(this.page - 1)}
        ?disabled=${this.page === 1}
        class="left-arrow"
      >
        &lt;
      </button>
      ${pages.map((p) =>
        p === '...'
          ? html`<span class="dots">...</span>`
          : html`
              <button
                class=${p === this.page ? 'active' : ''}
                @click=${() => this.setPage(p)}
                ?disabled=${p === this.page}
              >
                ${p}
              </button>
            `
      )}
      <button
        @click=${() => this.setPage(this.page + 1)}
        ?disabled=${this.page === this.totalPages}
        class="right-arrow"
      >
        &gt;
      </button>
    `;
  }
}

customElements.define('simple-pagination', SimplePagination);
