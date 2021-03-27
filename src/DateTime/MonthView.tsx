import { css, cx } from '@emotion/css';
import { noop } from 'rxjs';

import { borderStyle, DatePickerHead } from './DatePickerHead';
import { MonthInfo, months } from './useDate';


export interface MonthViewProps {
  class?: string;

  monthInfo: MonthInfo;
  onAction?: () => void;
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

  const { monthInfo, onAction } = props;

  const label = months[monthInfo.month][1] + ' ' + monthInfo.year;

  const daysEl = monthInfo.days.map((x) => (
    <div class={dateStyle} tabIndex={-1} style={{ gridColumn: (x.dayOfWeek + 1)}}>
      {x.dayOfMonth}
    </div>
  ));

  return (
    <div class={cx('cla-month-view', props.class)}>
      <DatePickerHead label={label} onAction={onAction} navigation={true} />
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
