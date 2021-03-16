import { useEffect, useMemo, useState } from 'preact/hooks';


export interface ListItem {
  disabled?: boolean;
}

export type ListValue<T> = T & ListItem;

export interface UseListProps<T> {
  options: ListValue<T>[];
  value?: ListValue<T>;
}

export interface UseList<T> {
  focused: ListValue<T> | null;
  focusedIndex: number;
  setNext: () => void;
  setPrevious: () => void;
  reset: () => void;
}


export function useList<T>(props: UseListProps<T>): UseList<T> {

  const { options, value } = props;

  // Maintain the currently highlighted item
  const [active, setActive] = useState(-1);

  const defaultActive = useMemo(() => options.findIndex((x) => x === value), [options, value]);

  // Reset the highlighted item whenever options or value change.
  useEffect(() => setActive(defaultActive), [defaultActive]);

  const setNext = () => setActive(getNext(options, active) ?? -1);
  const setPrevious = () => setActive(getPrevious(options, active) ?? -1);
  const reset = () => setActive(defaultActive);

  return {
    focused: options[active] ?? null,
    focusedIndex: active,
    setNext,
    setPrevious,
    reset
  };
}


function getNext<T>(options: ListValue<T>[], current: number, visited: number = 0): number | null {

  const length = options.length;

  if (length === visited) {
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
  }

  const nextIndex = current > 0 ? (current - 1) : length - 1;

  if (options[nextIndex].disabled) {
    return getPrevious(options, nextIndex, visited + 1);
  }

  return nextIndex;
}
