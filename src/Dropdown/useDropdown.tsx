import { ListValue, useList } from '../List/useList';
import { useDropdownSurface } from '../surface/useDropdownSurface';
import { UseSurfaceHook } from '../surface/useSurface';
import { makeKeyboardHandler, prevent } from '../util/keyboard';



export interface UseDropdownProps<T> {
  options?: ListValue<T>[];
  value?: ListValue<T>;
}


export interface UseDropdownHook<T> extends UseSurfaceHook {
  focused?: ListValue<T>;
}


export function useDropdown<T>(props: UseDropdownProps<T>): UseDropdownHook<T> {

  const { options = [], value } = props;

  const dds = useDropdownSurface();
  const list = useList({ options, value });

  const onKeydown = makeKeyboardHandler({
    Escape: prevent(dds.close),
    Tab: prevent(dds.close),

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
    dds.open();
  };

  return {
    ...dds,
    open,
    surfaceProps: {
      ...dds.surfaceProps,
      onKeydown
    },
    focused: list.focused ?? undefined,
  };
}
