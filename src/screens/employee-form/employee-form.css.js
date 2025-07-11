import {css} from 'lit';

export const employeeFormStyles = css`
  .outer-container {
    max-width: 1100px;
    margin: 2rem auto;
  }
  .header-container > p {
    font-size: 1.5rem;
    margin: 2rem 0;
    color: #ff6101;
  }
  .form-container {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 3rem;
  }
  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  label {
    font-size: 1rem;
    color: #444;
    margin-bottom: 0.3rem;
  }
  input,
  select {
    padding: 0.5rem 0.7rem;
    border: 1px solid #bbb;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s;
  }
  input:focus,
  select:focus {
    border-color: #ff6101;
  }
  .form-actions {
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  .save-btn {
    background: #ff6101;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.7em 3em;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }
  .save-btn:hover {
    background: #e65c00;
  }
  .cancel-btn {
    background: #fff;
    color: #4b3fae;
    border: 2px solid #4b3fae;
    border-radius: 6px;
    padding: 0.7em 3em;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .cancel-btn:hover {
    background: #f3f0ff;
    color: #2d246b;
  }
  @media (max-width: 900px) {
    form {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
    }
    .form-actions {
      grid-column: 1 / span 2;
    }
  }
  @media (max-width: 600px) {
    .form-container {
      padding: 1rem 0.5rem;
    }
    form {
      grid-template-columns: 1fr;
      grid-template-rows: none;
      gap: 1.2rem 0;
    }
    .form-actions {
      grid-column: 1 / span 1;
      flex-direction: column;
      gap: 1rem;
    }
  }
  .custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url('/src/_assets/icons/arrow_drop_down.svg') no-repeat right
      0.75em center/1.5em;
    padding-right: 2.5em;
  }
  .with-calendar {
    background: url('/src/_assets/icons/calendar.svg') no-repeat right 0.75em
      center/1.5em;
    /* padding-right: 2.5em; */
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
    color: white;
  }
  input[type='date']::-moz-calendar-picker-indicator {
    display: none;
  }
`;
