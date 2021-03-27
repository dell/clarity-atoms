import { css, cx } from '@emotion/css';
import { useEffect, useState } from 'preact/hooks';

import { Button } from '../Button';
import { borderStyle, DatePickerHead } from './DatePickerHead';

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

  // pageYear holds the reference year around which current page's bounds are drawn.
  const [pageYear, setPageYear] = useState(year);

  const startYear = Math.max(pageYear - 10, minYear);
  const endYear = Math.min(pageYear + 9, maxYear);

  // Count the endYear also in the calculations.
  const diff = endYear - startYear + 1;

  const adjustedEndYear = diff < 20
    ? Math.min(startYear + 19, maxYear)
    : endYear;

  const finalDiff = adjustedEndYear - startYear + 1;

  // Update page year whenever input year is changed.
  useEffect(() => setPageYear(year), [year]);

  // There is no point in clicking previous if minYear is hit.
  const onPrev = (startYear > minYear)
    ? () => setPageYear(Math.max(startYear - 10, minYear))
    : undefined;

  const onNext = (adjustedEndYear < maxYear)
    ? () => setPageYear(Math.min(adjustedEndYear + 11, maxYear))
    : undefined;

  const label = `${startYear} - ${adjustedEndYear}`;

  const array = new Array(finalDiff).fill(0)
    .map((_, index) => startYear + index)
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
        {array}
      </div>
    </div>
  );
}
