import {css} from 'lit';

export const confirmDialogStyles = css`
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dialog {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
    padding: 1.2rem;
    min-width: 320px;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    animation: fadeIn 0.3s;
  }
  .close-btn {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #ff6200;
    cursor: pointer;
  }
  .title {
    color: #ff6200;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .desc {
    color: black;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .proceed-btn {
    background: #ff6200;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.7rem 0;
    cursor: pointer;
    margin-bottom: 0.2rem;
    transition: background 0.15s;
  }
  .proceed-btn:hover {
    background: #e55a00;
  }
  .cancel-btn {
    background: #fff;
    color: #ff6200;
    border: 1.5px solid #ff6200;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.7rem 0;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .cancel-btn:hover {
    background: #ff6200;
    color: #fff;
  }
  @media (max-width: 600px) {
    .dialog {
      min-width: 90vw;
      padding: 1.2rem 0.7rem 1rem 0.7rem;
    }
    .close-btn {
      top: 0.7rem;
      right: 0.7rem;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
