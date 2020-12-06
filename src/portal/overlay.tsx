import { css } from '@emotion/css';


export const overlayBase = css`
  position: fixed;

  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const transparentOverlay = css`
  ${overlayBase};
`;

export const darkOverlay = css`
  ${overlayBase};
  background-color: rgba(0, 0, 0, 0.12);
`;
