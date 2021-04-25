import { css } from '@emotion/css';


export const focusStyle = css`
  border-color: var(--ca-primary);
`;

export const borderStyle = css`
  border: 1px solid transparent;
  transition: border-color 150ms ease-out;

  &:hover {
    border-color: var(--ca-border-hover);
  }

  &:focus {
    ${focusStyle};
  }
`;

export const hoverStyle = css`
  border-color: var(--ca-border-hover);
`;

export const disabledStyle = css`
  cursor: default;

  color: var(--ca-disabled);
  border-color: transparent;

  &:focus {
    border-color: var(--ca-disabled);
  }
`;

export const selectedStyle = css`
  color: var(--ca-primary-comp);
  background-color: var(--ca-primary);
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
