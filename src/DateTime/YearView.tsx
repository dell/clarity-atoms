import { css, cx } from '@emotion/css';
import { Fragment } from 'preact';

import { Button } from '../Button';

import { DatePickerHead } from './DatePickerHead';
import { borderStyle, currentStyle, disabledStyle } from './style';
import { MonthInfo, YearInfo, YearMonth } from './useCalendar';


export interface YearProps {
  class?: string;

  years: YearInfo[];
  onCentury: (year: number) => void;
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

  &:disabled {
    ${disabledStyle};
  }
`;

const gapStyle = css`
  margin-top: 1rem;
`;


export function YearView(props: YearProps) {

  const { years, onCentury, onSelect, onPrev, onNext  } = props;

  return (
    <div class={cx('cla-year-view', props.class)}>
      {years.map((x, index) => {
        const onMonthChange = (month: number) => onSelect([x.year, month]);

        return (
          <Fragment>
            <DatePickerHead class={cx(index > 0 && gapStyle)} label={x.year}
              navigation={index === 0} onAction={() => onCentury(x.year)}
              onPrev={onPrev} onNext={onNext} />
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
          <Button class={cx(itemStyle, x.isCurrent && 'current')}
            variant='minimal' disabled={x.disabled}
            onClick={() => onMonth(index)}>
              {x.abbr}
          </Button>
        );
      })}
    </Fragment>
  );
}
