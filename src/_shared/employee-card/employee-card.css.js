import {css} from 'lit';

export const employeeCardStyles = css`
  .employee-card {
    border: 1px solid #ddd;
    /* border-radius: 6px; */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 1.5px 6px rgba(0, 0, 0, 0.08);
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    background: white;
    margin-bottom: 1.5rem;
    min-width: 320px;
    max-width: 480px;
  }
  @media (max-width: 600px) {
    .employee-card {
      width: 100%;
      box-sizing: border-box;
    }
  }
  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 2rem;
  }
  .label {
    color: #888;
    font-size: 0.95rem;
    margin-bottom: 0.1rem;
  }
  .value {
    color: #222;
    font-size: 1.08rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    word-break: break-word;
  }
  .card-actions {
    margin-top: 1.2rem;
    display: flex;
    gap: 1rem;
  }
  .edit-btn,
  .delete-btn {
    display: flex;
    align-items: center;
    gap: 0.4em;
    border: none;
    border-radius: 6px;
    padding: 0.5em 1.2em;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
  .edit-btn {
    background: #4b3fae;
    color: #fff;
  }
  .delete-btn {
    background: #ff6101;
    color: #fff;
  }
`;
