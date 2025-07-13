import {css} from 'lit';

export const simplePaginationStyles = css`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-family: inherit;
  }
  button {
    background: none;
    border: none;
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s, color 0.2s;
  }
  button.left-arrow:not([disabled]),
  button.right-arrow:not([disabled]) {
    color: #ff6101;
  }
  button[disabled] {
    cursor: not-allowed;
  }
  .active {
    background: #ff6101;
    color: #fff;
  }
  .dots {
    padding: 0 0.5rem;
    color: #aaa;
    font-size: 1.1rem;
    user-select: none;
  }
`;
