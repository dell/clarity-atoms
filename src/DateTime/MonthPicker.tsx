import { css, cx } from '@emotion/css';
import { Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { Button } from '../Button';
import { makeKeyboardHandler, prevent } from '../util/keyboard';

import { DatePickerHead } from './DatePickerHead';
import { borderStyle, currentStyle, disabledStyle, focusStyle } from './style';
import { MonthInfo, YearInfo, YearMonth } from './useCalendar';
import { useRovingIndex } from './useRoving';


export interface MonthPickerProps {
  class?: string;

  years: YearInfo[];
  onYear: (year: number) => void;
  onSelect: (value: YearMonth) => void;
  onPrev?: () => void;
  onNext?: () => void;
}


const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0.25rem;
`;

const itemStyle = css`
  ${borderStyle};
  height: 42px;
  padding: 0.5rem;

  &.current {
    ${currentStyle};

    &::after {
      width: 1.75rem;
    }
  }

  &:focus {
    ${focusStyle};
  }

  &:disabled {
    ${disabledStyle};
  }
`;

const gapStyle = css`
  margin-top: 1rem;
`;


type FocusToken = ['prev' | 'next', number];

export function MonthPicker(props: MonthPickerProps) {

  const { years, onYear, onSelect, onPrev, onNext  } = props;

  const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<FocusToken | null>(null);

  const yearList = years.map((x) => x.year);
  const gridItems = years.flatMap((x) => x.months.map((y) => `${x.year}-${y.abbr}`));

  // Year grid has 6 columns.
  const rover = useRovingIndex(gridItems, {
    scope: gridRef!,
    gridSize: 6
  });

  // If there was pending focus operation, then attempt to execute it.
  useEffect(() => {
    const toFocus = pendingFocus.current;

    // Is there a focus on the magical hidden lement
    const inInvisibleFocused = focusRef.current === document.activeElement;

    if (toFocus !== null && inInvisibleFocused) {
      const [direction, index] = toFocus;

      if (direction === 'next') {
        rover.set(index);
      } else if (direction === 'prev') {
        rover.set(yearList.length * 12 - index);
      }
    }

    // Reset focus state
    pendingFocus.current = null;

  }, yearList);


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
    ArrowUp: prevent(() => adjustFocus(rover.prevRow, onPrev, ['prev', 6 - rover.index])),

    ArrowDown: prevent(() =>
      adjustFocus(rover.nextRow, onNext, ['next', rover.index + 6 - gridItems.length])),

    ArrowLeft: prevent(() => adjustFocus(rover.prev, onPrev, ['prev', 0])),
    ArrowRight: prevent(() => adjustFocus(rover.next, onNext, ['next', 1]))
  });

  return (
    <div class={cx('cla-month-picker', props.class)} ref={setGridRef}>
      {years.map((x, index) => {
        const onMonthChange = (month: number) => onSelect([x.year, month]);
        const onAction = index === 0 ? (() => onYear(x.year)) : undefined;

        return (
          <Fragment>
            <DatePickerHead class={cx(index > 0 && gapStyle)} label={x.year}
              navigation={index === 0} onAction={onAction}
              onPrev={onPrev} onNext={onNext} />
            <div class={gridStyle} onKeyDown={onGridKeyDown}>
              <MonthList year={x.year} months={x.months} onMonth={onMonthChange} rover={rover} />
            </div>
          </Fragment>
        );
      })}
      {/* An invisible div to trap focus during transaction */}
      <div tabIndex={-1} ref={focusRef}></div>
    </div>
  );
}


interface MonthListProps {
  onMonth: (month: number) => void;
  year: number;
  months: MonthInfo[];
  rover: ReturnType<typeof useRovingIndex>;
}

function MonthList(props: MonthListProps) {

  const { onMonth, year, months, rover } = props;

  return (
    <Fragment>
      {months
        .map((x, index) => {
          return (
            <Button {...rover.prop(`${year}-${x.abbr}`)}
              class={cx(itemStyle, x.isCurrent && 'current')}
              variant='minimal' disabled={x.disabled}
              onClick={() => onMonth(index)}>
                {x.abbr}
            </Button>
          );
        })}
    </Fragment>
  );
}
