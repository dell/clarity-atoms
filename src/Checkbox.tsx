import { cx, css } from '@emotion/css';
import { h, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

import { SVGIcon } from './icons/SVGIcon';

export const checkboxStyles = css`
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

export const checkboxDisabledStyles = css`
  color: #BBBBBB;
`;


// Stateful values
let checkboxCounter = 0;

export type CheckboxProps<T> = Partial<{
  class: string;
  checked: boolean;
  children: ComponentChildren | ComponentChildren[];
  id: string;
  name: string;
  value: T;
  onChange: (checked: boolean) => void;

  disabled: boolean;
}>;


export function Checkbox<T>(props: CheckboxProps<T>) {

  const [autoId, _] = useState(() => `cwc_checkbox_${checkboxCounter++}`);
  const formFieldId = props.id || autoId;

  const onChange = () => props.onChange && props.onChange(!props.checked);

  return (
    <div class={cx('cwc-checkbox', checkboxStyles, props.disabled && checkboxDisabledStyles, props.class)}>
      <input type='checkbox' id={formFieldId} name={props.name} checked={props.checked} onChange={onChange} disabled={props.disabled} />
      { props.children
        ? <label for={formFieldId}>{props.children}</label>
        : null }
    </div>
  );
}

export interface SVGCheckboxProps {
  class?: string;
  checked?: boolean;
  border?: boolean;
}


const svgCheckboxStyle = css`
  width: 1rem;
  height: 1rem;
  padding: 2px;

  fill: transparent;
`;

const borderStyle = css`
  border: 1px solid #CCC;
  border-radius: 4px;
`;

const selectedStyle = css`
  fill: currentColor;
`;


/**
 * Strictly use this checkbox for ornamental purpose.
 * Something like read-only display - within button, labels, etc.
 */
export function SVGCheckbox(props: SVGCheckboxProps) {

  const { checked } = props;

  const border = props.border ?? true;

  return <SVGIcon name={'shapeCheck'} class={cx(props.class, svgCheckboxStyle, border && borderStyle, checked && selectedStyle)} />;
}
