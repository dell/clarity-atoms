import { css } from '@emotion/css';
import { useMemo, useRef, useState } from 'preact/hooks';

import { MonthView } from 'clarity-atoms/DateTime/MonthView';
import { useMonth, YearMonth } from 'clarity-atoms/DateTime/useCalendar';


const rootStyle = css`
  display: flex;
  justify-content: center;
`;

const style = css`
  border: 1px solid #E0E0E0;
`;

const emptySet: Set<number> = new Set();
const minDate = new Date(1980, 0);
const maxDate = new Date(2040, 11);

export default function MonthViewEx() {

  const current = useMemo(() => new Date(), []);
  const [date, setDate] = useState(() => current);

  const [[year, month], setView] = useState(() => [date.getFullYear(), date.getMonth()]);

  const x = useRef(null);

  const { days, prev, next } = useMonth({
    year, month,
    min: minDate,
    max: maxDate,
    disabled: emptySet,
    selected: emptySet,
    onChange: setView as any
  });

  const onYearMonthChange = () => {};
  const onActivate = () => {};

  return (
    <div class={rootStyle}>
      <MonthView class={style} ref={x}
        year={year} month={month} days={days}
        onYear={onYearMonthChange} onActivate={onActivate}
        onPrev={prev} onNext={next} />
    </div>
  );
}
