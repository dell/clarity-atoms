import { css, cx } from '@emotion/css';
import { Fragment } from 'preact';

import { Button } from '../Button';

import { borderStyle, DatePickerHead, disabledStyle } from './DatePickerHead';
import { MonthInfo, useYear, YearMonth } from './useCalendar';


export interface YearProps {
  class?: string;

  min: Date;
  max: Date;
  year: number;
  onCentury: (year: number) => void;
  onSelect: (value: YearMonth) => void;
}


const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0.25rem;
`;

const itemStyle = css`
  ${borderStyle};
  ${disabledStyle};
  height: 42px;
  padding: 0.5rem;
`;

const gapStyle = css`
  margin-top: 1rem;
`;


export function YearView(props: YearProps) {

  const { onCentury, onSelect, min, max } = props;

  const { years, prev, next } = useYear({ seedYear: props.year, min, max });

  return (
    <div class={cx('cla-year-view', props.class)}>
      {years.map((x, index) => {
        const onMonthChange = (month: number) => onSelect([x.year, month]);

        return (
          <Fragment>
            <DatePickerHead class={cx(index > 0 && gapStyle)} label={x.year}
              navigation={index === 0} onAction={() => onCentury(x.year)}
              onPrev={prev} onNext={next} />
            <div class={gridStyle}>
              <MonthList months={x.months} onMonth={onMonthChange} />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}


interface MonthListProps {
  onMonth: (month: number) => void;
  months: MonthInfo[];
}

function MonthList(props: MonthListProps) {

  const { onMonth, months } = props;

  return (
    <Fragment>
      {months
      .map((x, index) => {
        return (
          <Button class={itemStyle} variant='minimal' disabled={x.disabled}
            onClick={() => onMonth(index)}>
              {x.abbr}
          </Button>
        );
      })}
    </Fragment>
  );
}
