import { css, cx } from '@emotion/css';
import { Ref } from 'preact';
import { forwardRef, useEffect, useRef, useState } from 'preact/compat';

import { Button } from '../Button';
import { qs } from '../util/dom';
import { makeKeyboardHandler } from '../util/keyboard';

import { DatePickerHead } from './DatePickerHead';
import { borderStyle, currentStyle, disabledStyle, focusStyle } from './style';
import { DayInfo, months, YearMonth } from './useCalendar';


export interface MonthViewProps {
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

export interface MonthViewRef {
  focus: (day?: number) => void;
}

const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-gap: 4px;
  grid-template-columns: repeat(7, 1fr);
`;

const weekStyle = css`
  display: flex;
  min-width: 2.25rem;
  min-height: 1.75rem;

  justify-content: center;
  align-items: center;

  ${borderStyle};
  font-size: 0.875rem;
`;


// There are following possibilities for day button styling
// 1. standard              2. today              3. selected
// 4. standard + disabled   5. today + disabled   6. selected + disabled
// 7. today + selected + disabled
// 8. range                 9. range + disabled
const dateStyle = css`
  ${weekStyle};
  min-height: 2rem;

  cursor: pointer;
  font-size: inherit;

  /* Case 2: today */
  &.today {
    ${currentStyle};

    &::after {
      width: 1.25rem;
    }
  }

  /* Case 3: selected */
  &.selected {
    color: var(--ca-primary-comp);
    background-color: var(--ca-primary);
    border-color: var(--ca-primary);
  }

  &.range {
    ${focusStyle};
  }

  &:focus {
    ${focusStyle};
  }

  /* Case 4 & Case 5: standard/today + disabled */
  &:disabled {
    ${disabledStyle};

    /* Case 6: selected + disabled */
    &.selected {
      color: var(--ca-primary-comp);
      background-color: var(--ca-disabled);
      border-color: var(--ca-disabled);
    }
  }
`;

type FocusToken = ['prev' | 'next', number];


export const MonthView = forwardRef(function MonthView(props: MonthViewProps, _ref: Ref<MonthViewRef>) {

  const { days, year, month, range, onYear, onActivate, onPrev, onNext } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<FocusToken | null>(null);

  // For locally managing the component focus
  const [currentFocus, setCurrentFocus] = useState<null | number>(1);

  const setFocus = (dayOfMonth: number) => {
    const elm = qs(rootRef.current, `[data-day='${dayOfMonth}']`);

    setCurrentFocus(dayOfMonth);
    elm?.focus();
  };


  const dayOne: DayInfo | undefined = days[0];
  const monthSize = days.length;


  // If there was pending focus operation, then attempt to execute it.
  useEffect(() => {
    const toFocus = pendingFocus.current;

    // Is there a focus on the magical hidden lement
    const inInvisibleFocused = focusRef.current === document.activeElement;

    if (toFocus !== null && inInvisibleFocused) {
      const [direction, distance] = toFocus;

      if (direction === 'next') {
        setFocus(distance);
      } else if (direction === 'prev') {
        setFocus(monthSize - distance);
      }
    }

    // Reset focus state
    pendingFocus.current = null;

  }, [year, month, monthSize]);


  const onGridKeyDown = makeKeyboardHandler({

    ArrowDown(e) {
      e.preventDefault();

      if (currentFocus) {
        const next = getNextWeek(days, currentFocus);

        if (next) {
          setFocus(next.dayOfMonth);
        } else if (onNext) {
          onNext();

          setCurrentFocus(null);
          focusRef.current?.focus();
          pendingFocus.current = ['next', 7 - (days.length - currentFocus)];
        }
      } else if (dayOne) {
        setFocus(dayOne.dayOfMonth);
      }
    },

    ArrowUp(e) {
      e.preventDefault();

      if (currentFocus) {
        const prev = getPrevWeek(days, currentFocus);

        if (prev) {
          setFocus(prev.dayOfMonth);
        } else if (onPrev) {
          onPrev();

          setCurrentFocus(null);
          focusRef.current?.focus();
          pendingFocus.current = ['prev', 7 - currentFocus];
        }
      } else if (dayOne) {
        setFocus(dayOne.dayOfMonth);
      }
    },

    ArrowLeft(e) {
      e.preventDefault();

      if (currentFocus) {
        const prev = getPrev(days, currentFocus);

        if (prev) {
          setFocus(prev.dayOfMonth);
        } else if (onPrev) {
          onPrev();

          setCurrentFocus(null);
          focusRef.current?.focus();
          pendingFocus.current = ['prev', 0];
        }
      } else if (dayOne) {
        setFocus(dayOne.dayOfMonth);
      }
    },

    ArrowRight(e) {
      e.preventDefault();

      if (currentFocus) {
        const next = getNext(days, currentFocus);

        if (next) {
          setFocus(next.dayOfMonth);
        } else if (onNext) {
          onNext();

          setCurrentFocus(null);
          focusRef.current?.focus();
          pendingFocus.current = ['next', 1];
        }
      } else if (dayOne) {
        setFocus(dayOne.dayOfMonth);
      }
    }

  });

  const label = months[month][1] + ' ' + year;

  return (
    <div class={cx('cla-month-view', props.class)} ref={rootRef}>
      <DatePickerHead label={label} navigation={true}
        onAction={() => onYear?.([year, month])} onPrev={onPrev} onNext={onNext} />
      <div class={gridStyle} onKeyDown={onGridKeyDown}>
        <div class={weekStyle}>Su</div>
        <div class={weekStyle}>Mo</div>
        <div class={weekStyle}>Tu</div>
        <div class={weekStyle}>We</div>
        <div class={weekStyle}>Th</div>
        <div class={weekStyle}>Fr</div>
        <div class={weekStyle}>Sa</div>
        {days.map((x) => {
          const classes = cx(dateStyle, x.isToday && 'today', x.selected && 'selected', x.inRange && 'range');
          const tabIndex = currentFocus === x.dayOfMonth ? 0 : -1;

          return (
            <Button class={classes} variant={'minimal'} data-day={x.dayOfMonth}
              disabled={x.disabled} tabIndex={tabIndex}
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


function getNext(days: DayInfo[], currentDay: number) {
  const current = days.findIndex((x) => x.dayOfMonth === currentDay);
  const slice = days.slice(current + 1);

  return slice.find((x) => !x.disabled);
}

function getPrev(days: DayInfo[], currentDay: number) {
  const current = days.findIndex((x) => x.dayOfMonth === currentDay);
  const slice = days.slice(0, current);

  return slice.reverse().find((x) => !x.disabled);
}

function getNextWeek(days: DayInfo[], currentDay: number) {
  const nextWeekDay = currentDay + 7;

  return days.find((x) => x.dayOfMonth === nextWeekDay);
}

function getPrevWeek(days: DayInfo[], currentDay: number) {
  const prevWeekDay = currentDay - 7;

  return days.find((x) => x.dayOfMonth === prevWeekDay);
}
