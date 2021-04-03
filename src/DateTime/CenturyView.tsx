import { css, cx } from '@emotion/css';

import { Button } from '../Button';

import { DatePickerHead } from './DatePickerHead';
import { borderStyle, currentStyle } from './style';


export interface CenturyViewProps {
  class?: string;

  currentYear: number;
  years: number[];
  onPrev?: () => void;
  onNext?: () => void;
  onSelect?: (year: number) => void;
}

const gridStyle = css`
  display: grid;
  padding: 0.5rem;

  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.25rem;
`;

const itemStyle = css`
  ${borderStyle};

  height: 3rem;
  padding: 0.5rem;

  &.current {
    ${currentStyle};

    &::after {
      width: 2.125rem;
      bottom: 6px;
    }
  }
`;


export function CenturyView(props: CenturyViewProps) {

  const { currentYear, years, onNext, onPrev, onSelect } = props;

  const label = `${years[0]} - ${years[years.length - 1]}`;

  const yearsElms = years
    .map((x) => {
      return (
        <Button class={cx(itemStyle, currentYear === x && 'current')} variant={'minimal'}
          onClick={() => onSelect?.(x)}>
            {x}
        </Button>
      );
    });

  return (
    <div class={cx('cla-century-view', props.class)}>
      <DatePickerHead label={label} navigation={true} onPrev={onPrev} onNext={onNext} />
      <div class={gridStyle}>
        {yearsElms}
      </div>
    </div>
  );
}
