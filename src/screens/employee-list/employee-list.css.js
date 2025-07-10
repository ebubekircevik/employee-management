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
`;
