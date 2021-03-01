import { Ref } from 'preact';

import { UseDropdownEffectHook, useDropdownEffect } from '../Dropdown/useDropdownEffect';
import { useList } from '../List/useList';


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

  const dde = useDropdownEffect();

  const open = () => {
    dde.open();
    onOpen?.();
  };

  const close = () => {
    dde.close();
    onClose?.();
  };

  const escape = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    close();
  };

  const select = (selected: T) => {
    close();
    onSelect?.(selected);
  };

  const list = useList(options || [], {
    keydown: {
      Tab: escape,
      Escape: escape,
    },
    onSelect: select
  });

  const hasOptions = options.length > 0;


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

  const anchorProps = {
    ...dde.anchorProps,
    onKeydown: onAnchorKeydown,
    onClick: dde.open
  };

  const surfaceProps = {
    ...dde.surfaceProps,
    onKeydown: list.onKeydown
  };

  return {
    ...dde,
    open,
    close,
    select,
    surfaceProps,
    anchorProps,
    highlighted: list.hightlightedIndex
  };
}
