import { useEffect, useState } from 'preact/hooks';

import { KeyboardHandlerProps, makeKeyboardHandler } from '../util/keyboard';

export interface ListItem {
  disabled?: boolean;
}

export type ListValue<T> = T & ListItem;

export interface UseListProps<T> {
  value?: ListValue<T>;
  onSelect?: (value: ListValue<T>) => void;
  keydown?: KeyboardHandlerProps;
}


export function useList<T>(options: ListValue<T>[], props: UseListProps<T>) {

  const { keydown, value, onSelect } = props;

  const [highlighted, setHighlighted] = useState(-1);


  useEffect(() => {
    // Reset the highlighted item
    setHighlighted(-1);
  } , [options]);

  const onKeydown = makeKeyboardHandler({
    Tab: keydown?.Tab,

    Enter(e) {
      if (highlighted > -1) {
        onSelect?.(options[highlighted]);
      }
      keydown?.Enter?.(e);
    },

    ArrowDown(e) {
      const nextIndex = getNext(options, highlighted);

      if (nextIndex !== null) {
        setHighlighted(nextIndex);
      }
      keydown?.ArrowDown?.(e);
    },

    ArrowUp(e) {
      const previousIndex = getPrevious(options, highlighted);

      if (previousIndex !== null) {
        setHighlighted(previousIndex);
      }
      keydown?.ArrowUp?.(e);
    },

    Space(e) {
      onSelect?.(options[highlighted]);
      keydown?.Space?.(e);
    },

    Escape: keydown?.Escape
    // Escape(e) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   close();
    // }
  });

  return {
    highlighted: options[highlighted] ?? null,
    hightlightedIndex: highlighted,
    onKeydown
  };
}


function getNext<T>(options: ListValue<T>[], current: number, visited: number = 0): number | null {

  console.log('getNext', options.length, current, visited);

  const length = options.length;

  if (length === visited) {
    return null;
  } else if (length === 1 && current === 0) {
    return null;
  }

  const nextIndex = (current + 1) % length;

  if (options[nextIndex].disabled) {
    return getNext(options, nextIndex, visited + 1);
  }

  return nextIndex;
}

function getPrevious<T>(options: ListValue<T>[], current: number, visited: number = 0): number | null {

  const length = options.length;

  if (length === visited) {
    return null;
  } else if (length === 1 && current === 0) {
    return null;
  }

  const nextIndex = current > 1 ? (current - 1) : length - 1;

  if (options[nextIndex].disabled) {
    return getPrevious(options, nextIndex, visited + 1);
  }

  return nextIndex;
}
