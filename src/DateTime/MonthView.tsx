import { css, cx } from '@emotion/css';

import { borderStyle, DatePickerHead } from './DatePickerHead';
import { months, useMonth, YearMonth } from './useCalendar';


export interface MonthViewProps {
  class?: string;

  year: number;
  month: number;
  onYear: (value: YearMonth) => void;
  onChange?: () => void;
}

const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-gap: 4px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, auto);
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

const dateStyle = css`
  ${weekStyle};
  min-height: 2rem;

  cursor: pointer;
  font-size: inherit;
`;


export function MonthView(props: MonthViewProps) {

  const { onYear } = props;

  const hook = useMonth({ month: props.month, year: props.year });

  const { days, year, month, prev, next } = hook;

  const label = months[month][1] + ' ' + year;

  const daysEl = days.map((x) => (
    <div class={dateStyle} tabIndex={-1} style={{ gridColumn: (x.dayOfWeek + 1)}}>
      {x.dayOfMonth}
    </div>
  ));

  return (
    <div class={cx('cla-month-view', props.class)}>
      <DatePickerHead label={label} navigation={true}
        onAction={() => onYear([year, month])} onPrev={prev} onNext={next} />
      <div class={gridStyle}>
        <div class={weekStyle}>Su</div>
        <div class={weekStyle}>Mo</div>
        <div class={weekStyle}>Tu</div>
        <div class={weekStyle}>We</div>
        <div class={weekStyle}>Th</div>
        <div class={weekStyle}>Fr</div>
        <div class={weekStyle}>Sa</div>
        {daysEl}
      </div>
    </div>
  );
}
