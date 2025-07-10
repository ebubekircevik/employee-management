import {css} from 'lit';

export const gridAppStyles = css`
  :host {
    display: block;
    /* padding: 1rem; */
  }
  .grid-container {
    overflow: scroll;
    /* background-color: white; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  @media (max-width: 600px) {
    .grid-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
