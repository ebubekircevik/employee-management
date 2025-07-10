import {css} from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    padding: 1rem;
  }
  .employee-list-container {
    border: 1px solid red;
  }
  .header-container {
    margin: 2rem 0;
    color: #ff6101;
  }
  .header-container > p {
    font-size: 1.5rem;
    margin: 0;
  }
  .list-container {
    overflow: scroll;
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
