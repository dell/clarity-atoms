import { css, cx } from '@emotion/css';
import { noop } from 'rxjs';

import { Button } from '../Button';
import { DatePickerHead } from './DatePickerHead';

import { months } from './useDate';


export interface YearProps {
  class?: string;

  year: number;
  onAction?: () => void;
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

  const { year, onAction } = props;


  return (
    <div class={cx('cla-year-view', props.class)}>
      <DatePickerHead label={year} onAction={onAction} navigation={true} />
      <div class={gridStyle}>
        {months.map(([mon, _month]) => {
          return (
            <Button class={itemStyle} variant='minimal'>
              {mon}
            </Button>
          );
        })}
      </div>
      <DatePickerHead class={gapStyle} label={year + 1} onAction={noop} />
      <div class={gridStyle}>
        {months.map(([mon, _month]) => {
          return (
            <Button class={itemStyle} variant='minimal'>
              {mon}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
