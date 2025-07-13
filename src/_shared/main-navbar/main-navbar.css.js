import {css} from 'lit';

export const mainNavbarStyles = css`
  :host {
    display: block;
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    min-height: 56px;
  }
  .navbar-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    text-decoration: none;
  }
  .navbar-logo {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 4px rgba(255, 102, 0, 0.08);
  }
  .navbar-logo img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
  .navbar-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: black;
    letter-spacing: 1px;
  }
  .navbar-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #ff6200;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
  }
  .nav-link.add {
    color: #ff6200;
    font-weight: 400;
  }
  .nav-link.inactive {
    opacity: 0.6;
  }
  .lang-btn {
    background: white;
    color: #fff;
    border: none;
    padding: 0;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .lang-dropdown {
    position: absolute;
    right: 0;
    top: 110%;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    z-index: 10;
    min-width: 110px;
    padding: 0.2rem 0;
  }
  .lang-dropdown-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    transition: background 0.15s;
  }
  .lang-dropdown-item:hover {
    background: #f5f5f5;
  }
  .lang-dropdown-item.selected {
    background: #f5f5f5;
    font-weight: 600;
  }
  @media (max-width: 600px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      padding: 0.5rem 1rem;
      gap: 0.5rem;
    }
    .navbar-right {
      gap: 1rem;
    }
  }
`;
