import { css, cx } from '@emotion/css';
import { ComponentChildren } from 'preact';

import { Button } from '../Button';
import { border, primary } from '../color';
import { DropdownSurface } from '../Dropdown/useDropdownEffect';
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

  useMode?: boolean;

  onSearch?: (search: string) => void;
  onChange?: (value: T) => void;
  onClear?: () => void;

  render: (value: T) => ComponentChildren;
  renderAnchor: (value: T) => ComponentChildren;
}

const anchorStyle = css`
  display: inline-flex;
  padding: 0.5rem 0.75rem;

  justify-content: flex-start;
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

const contentStyle = css`
  display: inline-flex;
  min-width: 0;
  margin-right: auto;

  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const placeholderStyle = css`
  margin-right: auto;

  color: #ABABAB;
`;

const closeButtonStyle = css`
  margin-left: 1rem;

  border: 1px solid transparent;

  outline: none;

  &:focus {
    border-color: ${primary};
  }
`;

const closeStyle = css`
  width: 1.125rem;
  height: 1.125rem;
  min-width: 1.125rem;

  fill: #444444;
`;

const chevStyle = css`
  margin-left: 1rem;
  width: 14px;
  height: 14px;
  min-width: 14px;

  transform: rotateZ(180deg);

  fill: #ABABAB;
`;



export function SimpleSelect<T>(props: SimpleSelectProps<T>) {

  const { options, value, placeholder, onChange, onClear, render, renderAnchor, useMode = true } = props;

  const dd = useSelect({
    options,
    value,
    onSelect: onChange
  });

  const onClose = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onClear?.();
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      e.preventDefault();
      e.stopPropagation();

      onClear?.();
    }
  };

  const classes = cx('simple-select', anchorStyle, dd.isOpen && 'focused', props.class);

  return (
    <div {...dd.anchorProps} ref={dd.anchorProps.ref} tabIndex={0} class={classes}>
      {value
        ? <div class={contentStyle}>{renderAnchor(value)}</div>
        : <div class={placeholderStyle}>{placeholder}</div>}
      {(onClear && value) && (
        <Button variant={'minimal'} class={closeButtonStyle}
          onClick={onClose} onKeyDown={onKeydown}>
            <SVGIcon name='close' class={closeStyle} />
        </Button>
      )}
      <SVGIcon name='chevThick' class={chevStyle} />
      <DropdownSurface dd={dd}>
        {options.map((x, index) => (
          <ListItem mode={useMode ? 'single' : undefined} context={x} selected={x === value}
            disabled={x.disabled} focused={dd.highlighted === index}
            onSelect={dd.select}>
              {render(x)}
          </ListItem>
        ))}
      </DropdownSurface>
    </div>
  );
}
