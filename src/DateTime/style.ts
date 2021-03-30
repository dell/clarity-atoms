import { css } from '@emotion/css';


export const borderStyle = css`
  border: 1px solid transparent;
  transition: all 120ms ease-out;

  &:not([disabled]):hover {
    border-color: var(--ca-border-hover);
  }
`;

export const disabledStyle = css`
  cursor: default;
  color: var(--ca-disabled);
`;

export const currentStyle = css`
  position: relative;

  color: var(--ca-primary);
  font-weight: 500;

  &::after {
    content: '';
    position: absolute;
    width: 1rem;
    height: 2px;
    bottom: 2px;

    left: 50%;
    transform: translateX(-50%);

    background: currentColor;
  }
`;

export const focusStyle = css`
  border-color: var(--ca-primary);
`;
