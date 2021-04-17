import { useState } from 'preact/hooks';

import { qs } from '../util/dom';

export interface RovingIndexOptions {
  scope: HTMLElement;
  wrapAround?: boolean;
  gridSize?: number;
}

// TODO: Can this be generalized?
// Also, find out if you can trust the DOM.
export function useRovingIndex<T extends (string | number)>(sequence: T[], options: RovingIndexOptions) {

  const { scope, wrapAround, gridSize } = options;

  // It maintains the index into the array.
  const [current, setCurrent] = useState(0);

  const findElm = (index: number) => qs(scope, `[data-roving='${sequence[index]}']`);

  const commit = (nextCurrent: number) => {
    const elm = findElm(nextCurrent);
    const isOkay = nextCurrent !== -1 && !!elm;

    if (isOkay) {
      setCurrent(nextCurrent);
      elm!.focus();
    }

    return isOkay;
  };


  return {
    active: sequence[current],
    sequence,
    index: current,

    next() {
      const newVal =
        current === (sequence.length - 1)
          ? wrapAround ? 0 : -1
          : current + 1;

      return commit(newVal);
    },

    nextRow() {
      const newVal = getNextRow(sequence, current, gridSize || 1);

      return commit(newVal);
    },

    prev() {
      const newVal =
        current === 0
          ? wrapAround ? (sequence.length - 1) : - 1
          : current - 1;

      return commit(newVal);
    },

    set(index: number) {
      const newVal = sequence[index] !== undefined ? index : -1;

      return commit(newVal);
    },

    setValue(value: T) {
      const newVal = sequence.indexOf(value);

      return commit(newVal);
    },

    prevRow() {
      const newVal = getPrevRow(sequence, current, gridSize || 1);

      return commit(newVal);
    },

    prop(x: T) {
      return {
        tabIndex: sequence[current] === x  ? 0 : -1,
        'data-roving': x
      };
    }
  };

}


function getNextRow<T>(sequence: T[], current: number, colums: number) {
  const nextRowItem = current + colums;
  return sequence[nextRowItem] !== undefined ? nextRowItem : -1;
}


function getPrevRow<T>(sequence: T[], current: number, columns: number) {
  const prevRowItem = current - columns;

  return sequence[prevRowItem] !== undefined ? prevRowItem : -1;
}
