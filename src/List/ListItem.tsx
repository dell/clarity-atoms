import { css, cx } from '@emotion/css';
import { ComponentChildren } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';


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
    background-color: initial;
    opacity: 0.75;
  }
`;



export function ListItem<T>(props: ListItemProps<T>) {

  const { mode, context, children, disabled, focused, selected, onRemove, onSelect } = props;

  const elmRef = useRef<HTMLDivElement>(null);

  // Attempt to scroll the highlighted item into the view
  useEffect(() => {
    if (focused && elmRef.current) {
      elmRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [focused, elmRef.current]);


  const onClick = () => {
    console.log('Click');

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
      {children}
    </div>
  );
}


const dividerStyle = css`
  border: 0;
  height: 1px;
`;

const primaryStyle = css`
  background: var(--ca-border);
`;

const secondaryStyle = css`
  background: var(--ca-border-secondary);
`;


export function Divider(props: { class?: string; type?: 'primary' | 'secondary'; }) {

  const { type = 'primary' } = props;

  const classes = cx(
    props.class,
    dividerStyle, type === 'primary'
      ? primaryStyle : secondaryStyle);

  return (
    <hr class={classes} />
  );
}
