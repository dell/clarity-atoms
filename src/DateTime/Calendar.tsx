import { css, cx } from '@emotion/css';
import { animate, easeOut } from 'popmotion';
import { useLayoutEffect, useState } from 'preact/hooks';
import styler from 'stylefire';

import { CenturyView } from './CenturyView';
import { MonthView } from './MonthView';
import { useCalendar, YearMonth } from './useCalendar';
import { YearView } from './YearView';


export interface CalendarProps {
  disabled?: Date[];
  min?: Date;
  max?: Date;

  value?: Date[];
  onActivate?: (value: Date) => void;
}

const rootStyle = css`
  width: 320px;
  height: 320px;

  overflow: hidden;
`;

const perspective = css`
  position: relative;
  height: 100%;

  perspective: 800px;
`;

const viewStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow: auto;
`;


enum Motion {
  MonthToYear,
  YearToCentury,
  CenturyToYear,
  YearToMonth
}

const monthView = '.cla-month-view';
const yearView = '.cla-year-view';
const centuryView = '.cla-century-view';


export function Calendar(props: CalendarProps) {

  const { value, min, max, disabled, onActivate } = props;

  const state = useCalendar({ value, min, max, disabled });

  const [view, setView] = useState<'month' | 'year' | 'century'>('month');
  const [ref, setRef] = useState<null | HTMLDivElement>(null);
  const [motion, setMotion] = useState<null | Motion>(null);


  const clearMotion = () => setMotion(null);

  useLayoutEffect(() => {
    if (ref && motion === Motion.MonthToYear) {
      return scaleInScaleOut(
        ref.querySelector(yearView)!,
        ref.querySelector(monthView)!,
        clearMotion);
    } else if (ref && motion === Motion.YearToCentury) {
      return scaleInScaleOut(
        ref.querySelector(centuryView)!,
        ref.querySelector(yearView)!,
        clearMotion);
    } else if (ref && motion === Motion.CenturyToYear) {
      return scaleOutScaleIn(
        ref.querySelector(yearView)!,
        ref.querySelector(centuryView)!,
        clearMotion);
    } else if (ref && motion === Motion.YearToMonth) {
      return scaleOutScaleIn(
        ref.querySelector(monthView)!,
        ref.querySelector(yearView)!,
        clearMotion);
    }
  }, [ref, motion]);


  const onMonthToYear = (value: YearMonth) => {
    setView('year');
    state.set(value);
    setMotion(Motion.MonthToYear);
  };

  const onCentury = (year: number) => {
    setView('century');
    setMotion(Motion.YearToCentury);
    state.set([year, null]);
  };

  const onCenturyToYear = (year: number) => {
    setView('year');
    setMotion(Motion.CenturyToYear);
    state.set([year, null]);
  };

  const onMonth = (value: YearMonth) => {
    setView('month');
    setMotion(Motion.YearToMonth);
    state.set(value);
  };


  const isCenturyView = view === 'century' || motion === Motion.CenturyToYear;

  const isYearView = view === 'year'
    || motion === Motion.YearToCentury
    || motion === Motion.YearToMonth;

  const isMonthView = view === 'month' || motion === Motion.MonthToYear;

  return (
    <div ref={setRef} class={cx(rootStyle, 'cla-date-picker-renderer')}>
      <div class={perspective}>
        {isCenturyView &&
          <CenturyView class={viewStyle} years={state.years}
            currentYear={state.current.getFullYear()} onSelect={onCenturyToYear}
            onPrev={state.onPrevYears} onNext={state.onNextYears} />}

        {isYearView &&
          <YearView class={viewStyle} years={state.months}
            onCentury={onCentury} onSelect={onMonth}
            onPrev={state.onPrevMonths} onNext={state.onNextMonths} />}

        {isMonthView &&
          <MonthView class={viewStyle}
            year={state.year} month={state.month} days={state.days}
            onYear={onMonthToYear} onActivate={onActivate}
            onPrev={state.onPrevDays} onNext={state.onNextDays} />}
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
    onUpdate: (x) => scaleInElm.set(x),
    onComplete: onDone
  });

  const exit = animate({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.8 },
    duration: 180,
    ease: easeOut,
    onUpdate: (x) => scaleOutElm.set(x)
  });

  return () => {
    enter.stop();
    exit.stop();
  };
}

function scaleOutScaleIn(scaleIn: Element, scaleOut: Element, onDone: () => void) {
  const scaleInElm = styler(scaleIn);
  const scaleOutElm = styler(scaleOut);

  const enter = animate({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    duration: 240,
    onUpdate: (x) => scaleInElm.set(x),
    onComplete: onDone
  });

  const exit = animate({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 1.3 },
    duration: 180,
    ease: easeOut,
    onUpdate: (x) => scaleOutElm.set(x)
  });

  return () => {
    enter.stop();
    exit.stop();
  };
}
