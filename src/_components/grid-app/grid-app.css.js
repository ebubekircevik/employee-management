import {css} from 'lit';

export const gridAppStyles = css`
  :host {
    display: block;
    /* padding: 1rem; */
  }
  .list-container {
    overflow: scroll;
    background-color: white;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    margin-bottom: 2rem;
  }
  table th,
  table td {
    padding: 1rem;
    border: none;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
    text-align: center;
  }
  table thead {
    color: #ff6101;
  }
  .icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
  }
`;
