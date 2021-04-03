import { css, cx } from '@emotion/css';
import { Ref } from 'preact';
import { forwardRef, useImperativeHandle } from 'preact/compat';

import { Button } from '../Button';

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
  focusDay: (day: number) => void;
  focusPrev: () => void;
  focusNext: () => void;
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


export const MonthView = forwardRef(function MonthView(props: MonthViewProps, ref: Ref<MonthViewRef>) {

  const { days, year, month, range, onYear, onActivate, onPrev, onNext } = props;

  useImperativeHandle(ref, () => {
    return {
      focusDay: (x: number) => void 0,
      focusNext: () => void 0,
      focusPrev: () => void 0
    };
  }, []);

  const label = months[month][1] + ' ' + year;


  return (
    <div class={cx('cla-month-view', props.class)}>
      <DatePickerHead label={label} navigation={true}
        onAction={() => onYear?.([year, month])} onPrev={onPrev} onNext={onNext} />
      <div class={gridStyle}>
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
            <Button class={classes} variant={'minimal'} disabled={x.disabled}
              onClick={() => onActivate?.(x.date)} style={{ gridColumn: (x.dayOfWeek + 1)}}>
                {x.dayOfMonth}
            </Button>
          );
        })}
      </div>
    </div>
  );
});
