import { css, cx } from '@emotion/css';
import { Ref } from 'preact';
import { forwardRef } from 'preact/compat';
import type { JSXInternal } from 'preact/src/jsx';

export type ButtonVariant = 'solid' | 'outline' | 'flat' | 'minimal';
export type ButtonType = 'button' | 'submit' | 'reset';


type BaseButtonProps = JSXInternal.HTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends BaseButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  compact?: boolean;
  ariaDisabled?: boolean;

  onClick?: (e: MouseEvent) => void;
  onClickDisabled?: (e: MouseEvent) => void;

  // Access native DOM Button element
  ref?: Ref<any>;
}


const base = css`
  display: inline-flex;
  padding: 0;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  background: transparent;
  color: var(--ca-primary);

  font-family: inherit;
  font-size: inherit;
`;

export const minimal = css`
  ${base};

  color: inherit;
  outline: none;

  border: none;
`;

const standard = css`
  ${base};

  border-radius: 0.2rem;
  padding: 0 1rem;

  /* Clarity standard button height */
  height: 36px;
  line-height: 1;

  border: none;
  outline: none;

  font-weight: bold;
  white-space: nowrap;

  &[disabled] {
    color: var(--ca-disabled);
  }
`;

const flat = css`
  ${standard};

  background: transparent;

  transition: all 120ms ease-out;

  &:hover {
    background: var(--ca-button-hover);
  }

  &:focus {
    background: var(--ca-button-focus);
  }

  &:disabled {
    background-color: transparent;
  }
`;

const outline = css`
  ${standard};

  border: 1px solid var(--ca-border);

  background: transparent;

  transition: all 120ms ease-out;

  &:hover {
    background: var(--ca-button-hover);
    border-color: var(--ca-primary);
  }

  &:focus {
    background: var(--ca-button-focus);
    border-color: var(--ca-primary);
  }

  &:disabled,
  &[aria-disabled='true'] {
    border-color: var(--ca-disabled-light);
    background-color: transparent;
  }
`;


// Backward compatibility with CSM buttons
const solid = css`
  ${standard};

  background-color: var(--ca-primary);
  color: var(--ca-primary-comp);

  &:hover {
    background-color: var(--ca-primary-semilight);
  }

  &:focus {
    background-color: var(--ca-primary-light);
  }

  &:disabled,
  &[aria-disabled='true'] {
    background-color: var(--ca-disabled-light);
  }
`;

const styles = { flat, outline, minimal, solid };

const compactStyle = css`
  /* Clarity compact button height */
  height: 24px;
`;


export const Button = forwardRef(function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {

  const { compact, title, children, onClick, onClickDisabled, ariaDisabled, disabled, type, variant } = props;

  const typeDef = type || 'button';
  const variantDef = variant || 'outline';

  const classes =  cx('ptr-button', styles[variantDef], compact && compactStyle, props.class);

  const propsCopy = { ...props };

  delete propsCopy.ariaDisabled;
  delete propsCopy.variant;

  const handler = (e: MouseEvent) => {
    if (ariaDisabled) {
      onClickDisabled?.(e);
    } else {
      onClick?.(e);
    }
  };

  return (
    <button {...propsCopy} type={typeDef} title={title} class={classes} ref={ref}
      aria-disabled={ariaDisabled} disabled={disabled}
      onClick={handler}>
        {children}
    </button>
  );
});
