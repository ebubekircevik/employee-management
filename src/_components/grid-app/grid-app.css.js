import {css} from 'lit';

export const gridAppStyles = css`
  :host {
    display: block;
  }
  .grid-container {
    overflow: scroll;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem 10rem;
  }
  @media (max-width: 600px) {
    .grid-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
