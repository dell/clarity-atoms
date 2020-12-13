import { css, cx } from '@emotion/css';
import { ComponentChildren } from 'preact';

import { border, primary } from '../color';

import { DropdownSurface } from '../Dropdown/Dropdown';
import { SVGIcon } from '../icons/SVGIcon';
import { ListItem } from '../List/ListItem';

import { useSelect } from './useSelect';


export interface SelectListItem {
  disabled?: boolean;
}


export interface SimpleSelectProps<T> {
  class?: string;
  placeholder: string;
  options: (T & SelectListItem)[];
  value?: T & SelectListItem;

  onSearch?: (search: string) => void;
  onChange?: (value: T) => void;
  render: (value: T) => ComponentChildren;
  renderAnchor: (value?: T) => ComponentChildren;
}

const anchorStyle = css`
  display: inline-flex;
  padding: 0.5rem 0.75rem;

  justify-content: space-between;
  align-items: center;

  line-height: 1;
  border: 1px solid ${border};
  outline: none;

  cursor: pointer;

  &.focused,
  &:focus {
    border-color: ${primary};
  }
`;

const chevStyle = css`
  margin-left: 1rem;
  width: 14px;
  height: 14px;
  min-width: 14px;

  transform: rotateZ(180deg);

  fill: #ABABAB;
`;

const placeholderStyle = css`
  color: #ABABAB;
`;


export function SimpleSelect<T>(props: SimpleSelectProps<T>) {

  const { options, value, placeholder, onChange, render, renderAnchor } = props;

  const dd = useSelect({
    options,
    value,
    onSelect: onChange
  });



  return (
    <div {...dd.anchorProps} tabIndex={0} class={cx('simple-select', anchorStyle, dd.isOpen && 'focused')}>
      {value
        ? renderAnchor(value)
        : <span class={placeholderStyle}>{placeholder}</span>}
      <SVGIcon name='chevThick' class={chevStyle} />
      <DropdownSurface dd={dd}>
        {options.map((x, index) => (
          <ListItem context={x} disabled={x.disabled} focused={dd.highlighted === index}>
            {render(x)}
          </ListItem>
        ))}
      </DropdownSurface>
    </div>
  );
}
