import { css } from '@emotion/css';
import { useMemo, useState } from 'preact/hooks';

import { MonthPicker } from 'clarity-atoms/DateTime/MonthPicker';
import { months, YearInfo } from 'clarity-atoms/DateTime/useCalendar';


const rootStyle = css`
  display: flex;
  justify-content: center;
`;

const style = css`
  border: 1px solid #E0E0E0;
`;


export default function MonthPickerEx() {

  const current = useMemo(() => new Date(), []);

  const [date, setDate] = useState(() => new Date(current));

  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth();

  const activeYear = date.getFullYear();

  const years: YearInfo[] = [activeYear, activeYear + 1]
    .map((year, yearIndex) => ({
      year,
      isCurrent: year === activeYear,
      months: months.map(([abbr, full], index) => ({
        abbr, full,
        isCurrent: currentYear === year && index === currentMonth,
        // Keep July, August, September of second year disabled
        disabled: yearIndex === 1 && index > 6 && index < 10
      }))
    }));

  const onPrev = () => {
    const newDate = new Date(date);

    newDate.setFullYear(activeYear - 2);
    setDate(newDate);
  };

  const onNext = () => {
    const newDate = new Date(date);

    newDate.setFullYear(activeYear + 2);
    setDate(newDate);
  };

  const noop = () => {};

  return (
    <div class={rootStyle}>
      <MonthPicker class={style} years={years}
        onYear={noop} onSelect={noop}
        onPrev={onPrev} onNext={onNext} />
    </div>
  );
}
