import { css, cx } from '@emotion/css';
import { useEffect, useState } from 'preact/hooks';

import { Button } from '../Button';
import { borderStyle, DatePickerHead } from './DatePickerHead';
import { useCentury } from './useCalendar';

export interface CenturyViewProps {
  class?: string;

  year: number;
  minYear: number;
  maxYear: number;

  onYear?: (year: number) => void;
}

const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.25rem;
`;

const itemStyle = css`
  ${borderStyle};

  height: 42px;
  padding: 0.5rem;
`;


export function CenturyView(props: CenturyViewProps) {

  const { year, minYear, maxYear, onYear } = props;

  const { list, onPrev, onNext } = useCentury({
    size: 20,
    seedYear: year,
    maxYear, minYear
  });

  const label = `${list[0]} - ${list[list.length - 1]}`;

  const listElms = list
    .map((x) => {
      return (
        <Button class={itemStyle} variant={'minimal'}
          onClick={() => onYear?.(x)}>
            {x}
        </Button>
      );
    });

  return (
    <div class={cx('cla-century-view', props.class)}>
      <DatePickerHead label={label} navigation={true} onPrev={onPrev} onNext={onNext} />
      <div class={gridStyle}>
        {listElms}
      </div>
    </div>
  );
}
