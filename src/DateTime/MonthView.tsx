import { css, cx } from '@emotion/css';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { noop } from 'rxjs';

import { borderStyle, DatePickerHead } from './DatePickerHead';
import { buildDays, MonthInfo, months } from './useDate';


export interface MonthViewProps {
  class?: string;

  year: number;
  month: number;
  onYear: (value: YearMonth) => void;
  onChange?: () => void;
}

export type YearMonth = [number | null, number | null];


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
  min-height: 2.25rem;

  justify-content: center;
  align-items: center;

  ${borderStyle};
  font-size: 0.875rem;
`;

const dateStyle = css`
  ${weekStyle};

  cursor: pointer;
  font-size: inherit;
`;


export function MonthView(props: MonthViewProps) {

  const { onYear } = props;

  const [local, setLocal] = useState<YearMonth>([null, null]);

  const year = local[0] ?? props.year;
  const month = local[1] ?? props.month;

  const days = useMemo(() => buildDays(month, year, new Set(), new Set(), new Date()), [month, year]);

  // Reset local selection when date changes
  useEffect(() => setLocal([null, null]), [props.year, props.month]);

  const onPrev = () => {
    if (month === 0) {
      setLocal([year - 1, 11]);
    } else {
      setLocal([year, month - 1]);
    }
  };

  const onNext = () => {
    if (month === 11) {
      setLocal([year + 1, 0]);
    } else {
      setLocal([year, month + 1]);
    }
  };

  const label = months[month][1] + ' ' + year;

  const daysEl = days.map((x) => (
    <div class={dateStyle} tabIndex={-1} style={{ gridColumn: (x.dayOfWeek + 1)}}>
      {x.dayOfMonth}
    </div>
  ));

  return (
    <div class={cx('cla-month-view', props.class)}>
      <DatePickerHead label={label} navigation={true}
        onAction={() => onYear([year, month])} onPrev={onPrev} onNext={onNext} />
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
