import { ListValue, useList } from '../List/useList';
import { makeKeyboardHandler, prevent } from '../util/keyboard';

import { useDropdownEffect, UseDropdownEffectHook } from './useDropdownEffect';


export interface UseDropdownProps<T> {
  options?: ListValue<T>[];
  value?: ListValue<T>;
}


export interface UseDropdownHook<T> extends UseDropdownEffectHook {
  focused?: ListValue<T>;
}


export function useDropdown<T>(props: UseDropdownProps<T>): UseDropdownHook<T> {

  const { options = [], value } = props;

  const dde = useDropdownEffect();
  const list = useList({ options, value });

  const onKeydown = makeKeyboardHandler({
    Escape: prevent(dde.close),
    Tab: prevent(dde.close),

    Enter(e) {
      if (list.focused) {
        // onSelect?.(options[list.focusedIndex]);
      }
    },

    ArrowDown: prevent(list.setNext),
    ArrowUp: prevent(list.setPrevious),

    Space(e) {

    }
  });

  const open = () => {
    list.reset();
    dde.open();
  };

  return {
    ...dde,
    open,
    surfaceProps: {
      ...dde.surfaceProps,
      onKeydown
    },
    focused: list.focused ?? undefined,
  };
}
