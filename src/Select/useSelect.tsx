import { Ref } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { UseDropdownEffectHook, useDropdownEffect } from '../Dropdown/useDropdownEffect';


export interface UseSelectProps<T> {
  value?: T;
  options: T[];
  isEqual?: (a: T, b: T) => boolean;
  onSelect?: (item: T) => void;
  onOpen?: () => void;
  onClose?: () => void;
}


export interface UseSelectHook<T> extends UseDropdownEffectHook {
  highlighted: number;
  surfaceProps: {
    ref: Ref<any>;
    onKeydown: (e: KeyboardEvent) => void;
  }
  select: (x: T) => void;
}


const isDefaultEqual = (a: any, b: any) => a === b;


export function useSelect<T>(props: UseSelectProps<T>): UseSelectHook<T>  {

  const { isEqual, value, options, onOpen, onClose, onSelect } = props;

  const [highlighted, setHighlighted] = useState(-1);
  const dd = useDropdownEffect();


  useEffect(() => {
    // Reset the highlighted item
    setHighlighted(-1);
  } , [options]);

  const hasOptions = options.length > 0;


  const open = () => {
    dd.open();
    onOpen?.();
  };

  const close = () => {
    dd.close();
    setHighlighted(-1);
    onClose?.();
  };

  const select = (selected: T) => {
    dd.close();
    onSelect?.(selected);
    onClose?.();
  };


  const onAnchorKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      // Enter or space key - Attempt to open
      open();

    } else if (e.key === 'ArrowUp' && hasOptions) {
      // Prevent in scrolling behavior
      e.preventDefault();
      e.stopPropagation();

      const currentIndex = value
        ? options.findIndex((x) => (isEqual || isDefaultEqual)(x, value))
        : -1;

      const nextItem = currentIndex < 1 ? options.length - 1 : currentIndex - 1;

      onSelect?.(options[nextItem]);

    } else if (e.key === 'ArrowDown' && hasOptions) {
      // Prevent in scrolling behavior
      e.preventDefault();
      e.stopPropagation();

      const currentIndex = value
        ? options.findIndex((x) => (isEqual || isDefaultEqual)(x, value))
        : -1;

      const nextItem = (currentIndex + 1) % options.length;

      onSelect?.(options[nextItem]);
    }
  };

  const onKeydown = (e: KeyboardEvent) => {

    if (e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      close();

    } else if (e.key === 'Enter' && highlighted > -1) {
      onSelect?.(options[highlighted]);
      close();

    } else if (e.key === 'ArrowUp') {
      setHighlighted((index) => index < 1 ? options.length - 1 : index - 1);

    } else if (e.key === 'ArrowDown') {
      setHighlighted((index) => (index + 1) % options.length);

    } else if (e.key === 'Space') {
      onSelect?.(options[highlighted]);
      close();

    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  };

  const anchorProps = {
    ...dd.anchorProps,
    onKeydown: onAnchorKeydown,
    onClick: dd.open
  };

  const surfaceProps = {
    ...dd.surfaceProps,
    onKeydown
  };

  return {
    ...dd,
    open,
    close,
    select,
    surfaceProps,
    anchorProps,
    highlighted
  };
}
