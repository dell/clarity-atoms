import { css, cx } from '@emotion/css';
import { useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { Button } from '../Button';

import { DatePickerHead } from './DatePickerHead';
import { YearMonth } from './MonthView';
import { months } from './useDate';


export interface YearProps {
  class?: string;

  year: number;
  onCentury: (year: number) => void;
  onMonth: (value: YearMonth) => void;
}


const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0.25rem;
`;

const itemStyle = css`
  height: 42px;
  padding: 0.5rem;
`;

const gapStyle = css`
  margin-top: 1rem;
`;


export function YearView(props: YearProps) {

  const { onCentury, onMonth } = props;

  const [local, setLocal] = useState<null | number>(null);

  const year = local ?? props.year;

  const onMonthChange1 = (month: number) => onMonth([year, month]);
  const onMonthChange2 = (month: number) => onMonth([year + 1, month]);

  const onPrev = () => {
    setLocal(year - 2);
  };

  const onNext = () => {
    setLocal(year + 2);
  };


  return (
    <div class={cx('cla-year-view', props.class)}>
      <DatePickerHead label={year} navigation={true}
        onAction={() => onCentury(year)} onPrev={onPrev} onNext={onNext} />
      <div class={gridStyle}>
        <MonthList onMonth={onMonthChange1} />
      </div>
      <DatePickerHead class={gapStyle} label={year + 1} />
      <div class={gridStyle}>
        <MonthList onMonth={onMonthChange2} />
      </div>
    </div>
  );
}


interface MonthListProps {
  onMonth: (month: number) => void;
}

function MonthList(props: MonthListProps) {

  const { onMonth } = props;

  return (
    <Fragment>
      {months
      .map(([mon, _month], index) => {
        return (
          <Button class={itemStyle} variant='minimal'
            onClick={() => onMonth(index)}>
              {mon}
          </Button>
        );
      })}
    </Fragment>
  );
}
