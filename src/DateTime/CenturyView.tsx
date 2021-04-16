import { css, cx } from '@emotion/css';
import { useEffect, useRef, useState } from 'preact/hooks';

import { Button } from '../Button';
import { useLatestRef } from '../helper/preact';
import { makeKeyboardHandler, prevent } from '../util/keyboard';

import { DatePickerHead } from './DatePickerHead';
import { borderStyle, currentStyle, focusStyle } from './style';
import { useRovingIndex } from './useRoving';


export interface CenturyViewProps {
  class?: string;

  currentYear: number;
  years: number[];
  onPrev?: () => void;
  onNext?: () => void;
  onSelect?: (year: number) => void;
}

const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.25rem;
`;

const itemStyle = css`
  ${borderStyle};

  height: 3rem;
  padding: 0.5rem;

  &:focus {
    ${focusStyle};
  }

  &.current {
    ${currentStyle};

    &::after {
      width: 2.125rem;
      bottom: 6px;
    }
  }
`;

type FocusToken = ['prev' | 'next', number];

const GRID_SIZE = 5;


export function CenturyView(props: CenturyViewProps) {

  const { currentYear, years, onNext, onPrev, onSelect } = props;

  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<FocusToken | null>(null);

  // Year grid has 6 columns.
  const rover = useRovingIndex(years, {
    scope: gridRef!,
    gridSize: GRID_SIZE
  });

  const roverRef = useLatestRef(rover);

  // If there was pending focus operation, then attempt to execute it.
  useEffect(() => {
    const rover = roverRef.current;
    const toFocus = pendingFocus.current;
    const gridLength = rover.sequence.length;

    // Is there a focus on the magical hidden lement
    const inInvisibleFocused = focusRef.current === document.activeElement;

    if (toFocus !== null && inInvisibleFocused) {
      const [direction, index] = toFocus;

      if (direction === 'next') {
        rover.set(Math.min(gridLength - 1, index));
      } else if (direction === 'prev') {
        const remainder = gridLength % GRID_SIZE;

        if (remainder === 0) {
          rover.set(gridLength - GRID_SIZE + index);
        } else if (remainder > index + 1) {
          rover.set(gridLength - remainder + index);
        } else {
          rover.set(gridLength - 1);
        }
      }
    }

    // Reset focus state
    pendingFocus.current = null;

  }, [years[0], years[years.length - 1]]);


  const adjustFocus = (nextCall: () => boolean, failCallback?: () => void, token?: FocusToken) => {
    const isNextOkay = nextCall();

    if (!isNextOkay && failCallback) {
      failCallback();

      // Initiate a transaction request for focus
      // It is valid and executed after the caller component
      // has supplied values for next month rendering
      focusRef.current?.focus();
      pendingFocus.current = token ?? null;
    }
  };


  const onGridKeyDown = makeKeyboardHandler({
    ArrowUp: prevent(() => adjustFocus(rover.prevRow, onPrev, ['prev', rover.index % GRID_SIZE])),

    ArrowDown: prevent(() =>
      adjustFocus(rover.nextRow, onNext, ['next', rover.index % GRID_SIZE])),

    ArrowLeft: prevent(() => adjustFocus(rover.prev, onPrev, ['prev', GRID_SIZE - 1])),
    ArrowRight: prevent(() => adjustFocus(rover.next, onNext, ['next', 0]))
  });

  const label = `${years[0]} - ${years[years.length - 1]}`;

  const yearsElms = years
    .map((x) => {
      return (
        <Button {...rover.prop(x)} class={cx(itemStyle, currentYear === x && 'current')}
          variant={'minimal'} onClick={() => onSelect?.(x)}>
            {x}
        </Button>
      );
    });

  return (
    <div class={cx('cla-century-view', props.class)}>
      <DatePickerHead label={label} navigation={true} onPrev={onPrev} onNext={onNext} />
      <div class={gridStyle} ref={setGridRef} onKeyDown={onGridKeyDown}>
        {yearsElms}
      </div>
      <div tabIndex={-1} ref={focusRef}></div>
    </div>
  );
}
