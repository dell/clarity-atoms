import { css, cx } from '@emotion/css';
import { Ref } from 'preact';
import { forwardRef, useEffect, useRef, useState } from 'preact/compat';

import { Button } from '../Button';
import { makeKeyboardHandler, prevent } from '../util/keyboard';

import { DatePickerHead } from './DatePickerHead';
import { borderStyle, currentStyle, disabledStyle, focusStyle, selectedStyle } from './style';
import { DayInfo, months, YearMonth } from './useCalendar';
import { useRovingIndex } from './useRoving';


export interface DayPickerProps {
  class?: string;

  days: DayInfo[];
  year: number;
  month: number;
  range?: [Date, Date];

  onPrev?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
  onYear?: (value: YearMonth) => void;
  onActivate?: (date: Date) => void;
}

export interface DayPickerRef {
  focus: (day?: number) => void;
}

const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-gap: 4px;
  grid-template-columns: repeat(7, 1fr);
`;

const baseButtonStyle = css`
  display: flex;
  min-width: 2.25rem;
  min-height: 1.75rem;

  justify-content: center;
  align-items: center;
`;

const weekStyle = css`
  ${baseButtonStyle};
  ${borderStyle};
  font-size: 0.875rem;
`;


// There are following possibilities for day button styling:
// 1. standard (hover + focus)  2. today              3. selected
// 4. standard + disabled       5. today + disabled   6. selected + disabled
// 7. today + selected + disabled
// 8. range                     9. range + disabled
const dateStyle = css`
  ${baseButtonStyle};
  ${borderStyle};
  min-height: 2rem;

  cursor: pointer;

  &.today {
    ${currentStyle};

    &::after {
      width: 1.25rem;
    }
  }

  &.selected {
    ${selectedStyle};
  }

  &.range {
    ${focusStyle};
  }

  &[aria-disabled='true'] {
    ${disabledStyle};

    &.selected {
      color: var(--ca-primary-comp);
      background-color: var(--ca-disabled);
      border-color: var(--ca-disabled);
    }
  }
`;

type FocusToken = ['prev' | 'next', number];


export const DayPicker = forwardRef(function DayPicker(props: DayPickerProps, _ref: Ref<DayPickerRef>) {

  const { days, year, month, range, onYear, onActivate, onPrev, onNext } = props;

  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<FocusToken | null>(null);

  // Month grid has 7 columns.
  const rover = useRovingIndex(days.map((x) => x.dayOfMonth), {
    scope: gridRef!,
    gridSize: 7
  });

  const monthSize = days.length;

  // If there was pending focus operation, then attempt to execute it.
  useEffect(() => {
    const toFocus = pendingFocus.current;

    // Is there a focus on the magical hidden lement
    const inInvisibleFocused = focusRef.current === document.activeElement;

    if (toFocus !== null && inInvisibleFocused) {
      const [direction, distance] = toFocus;

      // Note: rover need not be added as an dependency.
      // You can cheat hooks is some rare occasions.
      // This is one such occasion.
      if (direction === 'next') {
        rover.setValue(distance);
      } else if (direction === 'prev') {
        rover.setValue(monthSize - distance);
      }
    }

    // Reset focus state
    pendingFocus.current = null;

  }, [year, month, monthSize]);


  // adjustFocus will help shift focus by +-1 day or +-1 week.
  // nextCall should focus to next/previous item. If it is at a boundary, then
  // it should return fail. If next focus has failed, faillCallback
  // will be called to informing the parent.
  const adjustFocus = (nextCall: () => boolean, failCallback?: () => void, token?: FocusToken) => {
    const isNextOkay = nextCall();

    if (!isNextOkay && failCallback) {
      failCallback();

      // Initiate a transaction request for focus.
      // It is valid and executed after the caller component
      // has supplied values for next month rendering
      focusRef.current?.focus();
      pendingFocus.current = token ?? null;
    }
  };

  const onGridKeyDown = makeKeyboardHandler({
    ArrowUp: prevent(() => adjustFocus(rover.prevRow, onPrev, ['prev', 7 - rover.active])),
    ArrowDown: prevent(() => adjustFocus(rover.nextRow, onNext, ['next', rover.active + 7 - monthSize])),
    ArrowLeft: prevent(() => adjustFocus(rover.prev, onPrev, ['prev', 0])),
    ArrowRight: prevent(() => adjustFocus(rover.next, onNext, ['next', 1]))
  });

  const label = months[month][1] + ' ' + year;

  return (
    <div class={cx('cla-day-picker', props.class)}>
      <DatePickerHead label={label} navigation={true}
        onAction={() => onYear?.([year, month])} onPrev={onPrev} onNext={onNext} />
      <div class={gridStyle} ref={setGridRef} onKeyDown={onGridKeyDown}>
        <div class={weekStyle}>Su</div>
        <div class={weekStyle}>Mo</div>
        <div class={weekStyle}>Tu</div>
        <div class={weekStyle}>We</div>
        <div class={weekStyle}>Th</div>
        <div class={weekStyle}>Fr</div>
        <div class={weekStyle}>Sa</div>
        {days.map((x) => {
          const classes = cx(dateStyle, x.isToday && 'today', x.selected && 'selected', x.inRange && 'range');

          return (
            <Button {...rover.prop(x.dayOfMonth)} class={classes}
              variant={'minimal'} ariaDisabled={x.disabled}
              style={{ gridColumn: (x.dayOfWeek + 1)}}
              onClick={() => onActivate?.(x.date)}>
                {x.dayOfMonth}
            </Button>
          );
        })}
      </div>
      {/* An invisible div to hack focus management */}
      <div tabIndex={-1} ref={focusRef}></div>
    </div>
  );
});
