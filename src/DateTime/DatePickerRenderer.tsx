import { css, cx } from '@emotion/css';
import { useLayoutEffect, useState } from 'preact/hooks';
import styler from 'stylefire';

import { MonthView } from './MonthView';
import { YearView } from './YearView';
import { MonthInfo, months } from './useDate';
import { animate } from 'popmotion';
import { DatePickerHead } from './DatePickerHead';
import { CenturyView } from './CenturyView';


export interface DatePickerRendererProps {
  monthInfo: MonthInfo;
}

const rootStyle = css`
  width: 360px;
  height: 320px;

  overflow: hidden;
`;

const perspective = css`
  position: relative;
  perspective: 800px;
`;

const position = css`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;


export function DatePickerRenderer(props: DatePickerRendererProps) {

  const { monthInfo } = props;

  const [view, setView] = useState<'month' | 'year' | 'century'>('month');
  const [ref, setRef] = useState<null | HTMLDivElement>(null);
  const [transition, setTransition] = useState(false);

  useLayoutEffect(() => {

    if (view === 'year' && ref) {
      return scaleInScaleOut(
        ref.querySelector('.cla-year-view')!,
        ref.querySelector('.cla-month-view')!,
        () => setTransition(false));
    } else if (view === 'century' && ref) {
      return scaleInScaleOut(
        ref.querySelector('.cla-century-view')!,
        ref.querySelector('.cla-year-view')!,
        () => setTransition(false));
    }
  }, [view, ref]);

  const onAction = () => {
    if (view === 'month') {
      setTransition(true);
      setView('year');
    } else if (view === 'year') {
      setTransition(true);
      setView('century');
    }
  };

  const label = view === 'month'
    ? months[monthInfo.month][1] + ' ' + monthInfo.year
    : monthInfo.year;


  const isCenturyView = view === 'century';
  const isMonthView = view === 'month' || (view === 'year' && transition);
  const isYearView = view === 'year' || (view === 'century' && transition);

  return (
    <div ref={setRef} class={cx(rootStyle, 'cla-date-picker-renderer')}>
      <DatePickerHead label={label} onAction={onAction} navigation={true} />
      <div class={perspective}>
        {isCenturyView && <CenturyView class={position} minYear={1900} maxYear={2100} />}
        {isYearView && <YearView class={position} year={monthInfo.year} />}
        {isMonthView && <MonthView class={position} month={monthInfo} />}
      </div>
    </div>
  );
}

function scaleInScaleOut(scaleIn: Element, scaleOut: Element, onDone: () => void) {

  const scaleInElm = styler(scaleIn);
  const scaleOutElm = styler(scaleOut);

  const enter = animate({
    from: { opacity: 0, scale: 1.2 },
    to: { opacity: 1, scale: 1 },
    duration: 240,
    onUpdate: (x) => scaleInElm.set(x)
  });

  const exit = animate({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.8 },
    duration: 150,
    onUpdate: (x) => scaleOutElm.set(x),
    onComplete: onDone
  });

  return () => {
    enter.stop();
    exit.stop();
  };

}
