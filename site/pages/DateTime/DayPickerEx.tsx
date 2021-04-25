import { css } from '@emotion/css';
import { useMemo, useRef, useState } from 'preact/hooks';

import { DayPicker } from 'clarity-atoms/DateTime/DayPicker';
import { useDays } from 'clarity-atoms/DateTime/useCalendar';


const rootStyle = css`
  display: flex;
  justify-content: center;
`;

const style = css`
  border: 1px solid #E0E0E0;
`;

const minDate = new Date(1980, 0);
const maxDate = new Date(2040, 11);


export default function DayPickerEx() {

  const current = useMemo(() => new Date(), []);
  const [date, setDate] = useState(() => current);

  // Previous day is selected
  const selected = useMemo(
    () => [new Date(current.getTime() - (24 * 60 * 60 * 1000))], [current]);

  // Next day is disabled
  const disabled = useMemo(
    () => [new Date(current.getTime() + (24 * 60 * 60 * 1000))], [current]);

  const [[year, month], setView] = useState(() => [date.getFullYear(), date.getMonth()]);

  const x = useRef(null);

  const { days, prev, next } = useDays({
    year, month,
    min: minDate,
    max: maxDate,
    disabled,
    selected,
    onChange: setView as any
  });

  const onYearMonthChange = () => {};
  const onActivate = () => {};

  return (
    <div class={rootStyle}>
      <DayPicker class={style} ref={x}
        year={year} month={month} days={days}
        onYear={onYearMonthChange} onActivate={onActivate}
        onPrev={prev} onNext={next} />
    </div>
  );
}
