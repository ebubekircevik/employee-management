import {css} from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    padding: 0 4rem;
  }
  .employee-list-container {
    /* border: 1px solid red; */
  }
  .header-container {
    margin: 2rem 0;
    color: #ff6101;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .view-toggle-icons {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .header-container > p {
    font-size: 1.5rem;
    margin: 0;
  }
`;
