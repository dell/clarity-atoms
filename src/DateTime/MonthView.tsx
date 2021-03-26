import { css, cx } from '@emotion/css';

import { Button } from '../Button';
import { SVGIcon } from '../icons/SVGIcon';
import { MonthInfo } from './useDate';


export interface MonthViewProps {
  class?: string;
  month: MonthInfo;
}

const headStyle = css`
  display: flex;
  padding: 0.5rem 0.5rem 0;

  justify-content: space-between;
`;

const borderStyle = css`
  border: 1px solid transparent;
  transition: all 120ms ease-out;

  &:hover {
    border-color: #F0F0F0;
  }
`;

const monthStyle = css`
  ${borderStyle};

  padding: 0.25rem 0.5rem;

  .chev {
    margin-left: 0.5rem;
    width: 0.75rem;
    height: 0.75rem;

    transform: rotateX(180deg);
  }
`;

const arrowStyle = css`
  width: 36px;
  height: 36px;

  ${borderStyle};

  &.down {
    margin-left: 0.25rem;

    transform: rotateX(180deg);
  }
`;

const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-gap: 4px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, auto);
`;

const weekStyle = css`
  display: flex;
  min-width: 36px;
  min-height: 36px;

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

const months = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December'];

export function MonthView(props: MonthViewProps) {

  const { month } = props;

  const daysEl = month.days.map((x) => (
    <div class={dateStyle} tabIndex={-1} style={{ gridColumn: (x.dayOfWeek + 1)}}>
      {x.dayOfMonth}
    </div>
  ));

  return (
    <div class={cx('cla-month-view')}>
      <div class={headStyle}>
        <Button class={monthStyle} variant='minimal'>
          <span>{months[month.month] + ' ' + month.year}</span>
          <SVGIcon class={'chev'} name='chevThick' />
        </Button>
        <div>
          <Button class={cx(arrowStyle, 'up')} variant='minimal'>
            <SVGIcon name='chevThick' />
          </Button>
          <Button class={cx(arrowStyle, 'down')} variant='minimal'>
            <SVGIcon name='chevThick' />
          </Button>
        </div>
      </div>
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
