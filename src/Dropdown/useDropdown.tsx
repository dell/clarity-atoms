import { useEffect } from 'preact/hooks';

import { ListValue, useList } from '../List/useList';
import { UseSurfaceHook } from '../surface/Surface';
import { makeKeyboardHandler, prevent } from '../util/keyboard';

import { useDropdownSurface } from './useDropdownSurface';


export interface UseDropdownProps<T> {
  options?: ListValue<T>[];
  value?: ListValue<T>;
  onSelect?: (x: ListValue<T>) => void;
}


export interface UseDropdownHook<T> extends UseSurfaceHook {
  focused?: ListValue<T>;
  select: (x: ListValue<T>) => void;
}


// DEV NOTES
// Focus management:
// Focus management gets tricky always. There are fours rules to manage focus with standard dropdowns.
//  1. When surface is opened, it should recieve the focus.
//  2. When outside surface is clicked, the focus should be left to be decided to the browser. But when
//      anchor is clicked (i.e. re-clicked), the focus should trap back to the surface.
//  3. When surface is closed due to escape, tab, mouse selection and keyboard selection, the focus should
//      shift back to the anchor element.


export function useDropdown<T>(props: UseDropdownProps<T>): UseDropdownHook<T> {

  const { options = [], value, onSelect } = props;

  const dds = useDropdownSurface();
  const list = useList({ options, value });

  // Rule 1 of focus management
  useEffect(() => {
    if (dds.isOpen && dds.surface) {
      dds.surface.focus();
    }
  }, [dds.isOpen, dds.surface]);


  const open = () => {
    if (dds.isOpen) {
      // Rule 2 of focus management
      dds.surface?.focus();
    } else {
      list.reset();
      dds.open();
    }
  };

  // Rule 3 of focus management
  const closeWithFocus = () => {
    dds.close();
    dds.anchor?.focus();
  };

  const select = (x: ListValue<T>) => {
    onSelect?.(x);
    closeWithFocus();
  };

  const onKeyboardSelect = prevent(() => {
    if (list.focused) {
      select(list.focused);
    }
  });

  const onKeydown = makeKeyboardHandler({
    Escape: prevent(closeWithFocus),
    Tab: prevent(closeWithFocus),

    Enter: onKeyboardSelect,
    Space: onKeyboardSelect,

    ArrowDown: prevent(list.setNext),
    ArrowUp: prevent(list.setPrevious)
  });


  return {
    ...dds,
    open,
    select,
    surfaceProps: {
      ...dds.surfaceProps,
      onKeydown
    },
    focused: list.focused ?? undefined,
  };
}
