import { css, cx } from '@emotion/css';
import { ComponentChildren, h, VNode } from 'preact';
import { useState } from 'preact/hooks';

// Stateful values
let radioCounter = 0;

export type RadioProps<T> = Partial<{
  class: string;
  checked: boolean;
  children: ComponentChildren | ComponentChildren[];
  id: string;
  name: string;
  value: T;
  onChange: (value?: T) => void;
}>;

export type RadioNode<T> = VNode<RadioProps<T>>;

export type RadioGroupProp<T> = {
  class?: string;
  children: RadioNode<T> | RadioNode<T>[];
  name?: string;
  value?: T;
  onChange?: (value?: T) => void;
};


export const radioStyles = css`
  display: inline-flex;
  align-items: center;

  input {
    cursor: pointer;
    margin-right: 0;
  }

  label {
    margin: 0 0 0 0.5rem;
    cursor: pointer;
  }
`;

export const radioDisabledStyles = css`
  color: #BBBBBB;
`;

export function Radio<T>(props: RadioProps<T>) {

  const [autoId, _] = useState(() => `cwc_radio_${radioCounter++}`);
  const formFieldId = props.id || autoId;

  const onClick = () => !props.checked && props.onChange?.(props.value);

  const classes = cx('cwc-radio', radioStyles, props.class);

  return (
    <div class={classes}>
      <input type='radio' id={formFieldId} name={props.name} checked={props.checked} onClick={onClick} />
      { props.children
        ? <label for={formFieldId}>{props.children}</label>
        : null }
    </div>
  );
}
