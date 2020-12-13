import { css, cx } from '@emotion/css';
import { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';


export interface ListItemProps<T> {
  class?: string;
  mode?: 'single' | 'multiselect';

  context: T;
  selected?: boolean;
  disabled?: boolean;
  focused?: boolean;

  onRemove?: (value: T) => void;
  onSelect?: (value: T) => void;

  children: ComponentChildren;
}


const className = 'list__item';
const focusedName = `${className}--focused`;
const disabledName = `${className}--disabled`;
const selectedName = `${className}--selected`;


const listItemStyle = css`
  display: flex;
  padding: 0.5rem 1rem;

  flex-direction: row;

  transition: all 120ms ease-out;
  outline: none;

  &.${focusedName},
  &:hover {
    background-color: #F0F0F0;
  }

  &.${disabledName} {
    opacity: 0.75;
  }
`;

const listInputStyle = css`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const listItemContentStyle = css`
  min-width: 0;

  flex-grow: 1;
`;


export function ListItem<T>(props: ListItemProps<T>) {

  const { mode, context, children, disabled, focused, selected, onRemove, onSelect } = props;

  const elmRef = useRef<HTMLDivElement>(null);

  // Attempt to scroll the highlighted item into the view
  useEffect(() => {
    if (focused && elmRef.current) {
      elmRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
    }
  }, [focused, elmRef]);


  const onClick = () => {
    if (!disabled) {
      if (selected && mode === 'multiselect') {
        onRemove?.(context);
      } else if (!selected) {
        onSelect?.(context);
      }
    }
  };

  const classes = cx(
    className,
    listItemStyle,
    disabled && disabledName,
    focused && focusedName,
    selected && selectedName,
    props.class);

  return (
    <div class={classes} onClick={onClick} tabIndex={-1} ref={elmRef}>
      {mode && (
        <div class={listInputStyle}>
          {mode === 'multiselect'
            ? <Checkbox class='list__item__input' checked={selected} disabled={disabled} />
            : <Radio class='list__item__input' checked={selected} />}
          </div>
      )}
      <div class={cx('list__item__main', listItemContentStyle)}>{children}</div>
    </div>
  );
}
