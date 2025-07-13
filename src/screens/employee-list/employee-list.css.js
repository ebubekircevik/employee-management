import {css} from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    max-width: 1200px;
    margin: 2rem auto;
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
  .search-container {
    margin: 1rem 0;
    width: 100%;
  }
  .search-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .search-input:focus {
    border-color: #ff6101;
  }
  .no-search-results {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
  }
  .no-data {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
  }
`;
