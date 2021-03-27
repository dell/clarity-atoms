import { css, cx } from '@emotion/css';
import { animate } from 'popmotion';
import { useLayoutEffect, useState } from 'preact/hooks';
import styler from 'stylefire';

import { CenturyView } from './CenturyView';
import { MonthView } from './MonthView';
import { MonthInfo } from './useDate';
import { YearView } from './YearView';


export interface DatePickerRendererProps {
  monthInfo: MonthInfo;
}

const rootStyle = css`
  width: 320px;
  height: 320px;

  overflow: hidden;
`;

const perspective = css`
  position: relative;
  perspective: 800px;
  height: 100%;
`;

const viewStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow: auto;
`;

// TODO: Reverse animation sequence
const enum Motion {
  MonthToYear,
  YearToCentury,
  CenturyToYear,
  YearToMonth
}


export function DatePickerRenderer(props: DatePickerRendererProps) {

  const { monthInfo } = props;

  const [view, setView] = useState<'month' | 'year' | 'century'>('month');
  const [ref, setRef] = useState<null | HTMLDivElement>(null);
  const [transition, setTransition] = useState(false);
  const [motion, setMotion] = useState<null | Motion>(null);

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
      setView('century');
    } else if (view === 'year') {
      setTransition(true);
      setView('century');
    }
  };

  const onYearChange = () => {
    setTransition(true);
    setView('year');
  };

  const isCenturyView = view === 'century';
  const isMonthView = view === 'month' || (view === 'year' && transition);
  const isYearView = view === 'year' || (view === 'century' && transition);

  return (
    <div ref={setRef} class={cx(rootStyle, 'cla-date-picker-renderer')}>
      <div class={perspective}>
        {isCenturyView &&
          <CenturyView class={viewStyle} minYear={1900} maxYear={2100}
            year={monthInfo.year} onYear={onYearChange} />}

        {isYearView &&
          <YearView class={viewStyle} year={monthInfo.year} onAction={onAction} />}

        {isMonthView &&
          <MonthView class={viewStyle} monthInfo={monthInfo} onAction={onAction} />}
      </div>
    </div>
  );
}


function scaleInScaleOut(scaleIn: Element, scaleOut: Element, onDone: () => void) {

  const scaleInElm = styler(scaleIn);
  const scaleOutElm = styler(scaleOut);

  const enter = animate({
    from: { opacity: 0, scale: 1.3 },
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

function slaleOutScaleIn(scaleIn: Element, scaleOut: Element, onDone: () => void) {
  const scaleInElm = styler(scaleIn);
  const scaleOutElm = styler(scaleOut);

  const enter = animate({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    duration: 240,
    onUpdate: (x) => scaleInElm.set(x)
  });

  const exit = animate({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 1.3 },
    duration: 150,
    onUpdate: (x) => scaleOutElm.set(x),
    onComplete: onDone
  });

  return () => {
    enter.stop();
    exit.stop();
  };
}
