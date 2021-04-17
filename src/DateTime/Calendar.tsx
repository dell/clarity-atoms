import { css, cx } from '@emotion/css';
import { animate, easeOut } from 'popmotion';
import { useLayoutEffect, useState } from 'preact/hooks';
import styler from 'stylefire';

import { YearPicker } from './YearPicker';
import { DayPicker } from './DayPicker';
import { useCalendar, YearMonth } from './useCalendar';
import { MonthPicker } from './MonthPicker';


export interface CalendarProps {
  class?: string;

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
  DayToMonth,
  MonthToYear,
  YearToMonth,
  MonthToDay
}

const dayPicker = '.cla-day-picker';
const monthPicker = '.cla-month-picker';
const yearPicker = '.cla-year-picker';


export function Calendar(props: CalendarProps) {

  const { value, min, max, disabled, onActivate } = props;

  const state = useCalendar({ value, min, max, disabled });

  const [view, setView] = useState<'day' | 'month' | 'year'>('day');
  const [ref, setRef] = useState<null | HTMLDivElement>(null);
  const [motion, setMotion] = useState<null | Motion>(null);

  const clearMotion = () => setMotion(null);

  useLayoutEffect(() => {
    if (ref && motion === Motion.DayToMonth) {
      return scaleInScaleOut(
        ref.querySelector(monthPicker)!,
        ref.querySelector(dayPicker)!,
        clearMotion);
    } else if (ref && motion === Motion.MonthToYear) {
      return scaleInScaleOut(
        ref.querySelector(yearPicker)!,
        ref.querySelector(monthPicker)!,
        clearMotion);
    } else if (ref && motion === Motion.YearToMonth) {
      return scaleOutScaleIn(
        ref.querySelector(monthPicker)!,
        ref.querySelector(yearPicker)!,
        clearMotion);
    } else if (ref && motion === Motion.MonthToDay) {
      return scaleOutScaleIn(
        ref.querySelector(dayPicker)!,
        ref.querySelector(monthPicker)!,
        clearMotion);
    }
  }, [ref, motion]);


  // Handler for transitioning from days to months
  const onDayToMonthPicker = (value: YearMonth) => {
    setView('month');
    state.set(value);
    setMotion(Motion.DayToMonth);
  };

  // Handler for transitioning from month to years
  const onYearPicker = (year: number) => {
    setView('year');
    setMotion(Motion.MonthToYear);
    state.set([year, null]);
  };

  // Handler for transitioning from years to months
  const onYearToMonthPicker = (year: number) => {
    setView('month');
    setMotion(Motion.YearToMonth);
    state.set([year, null]);
  };

  // Handler for transitioning from months to days
  const onDayPicker = (value: YearMonth) => {
    setView('day');
    setMotion(Motion.MonthToDay);
    state.set(value);
  };


  const isYearPicker = view === 'year' || motion === Motion.YearToMonth;

  const isMonthPicker = view === 'month'
    || motion === Motion.MonthToYear
    || motion === Motion.MonthToDay;

  const isDayPicker = view === 'day' || motion === Motion.DayToMonth;

  return (
    <div ref={setRef} class={cx('cla-calendar', rootStyle, props.class)}>
      <div class={perspective}>
        {isYearPicker &&
          <YearPicker class={viewStyle} years={state.years}
            currentYear={state.current.getFullYear()} onSelect={onYearToMonthPicker}
            onPrev={state.onPrevYears} onNext={state.onNextYears} />}

        {isMonthPicker &&
          <MonthPicker class={viewStyle} years={state.months}
            onYear={onYearPicker} onSelect={onDayPicker}
            onPrev={state.onPrevMonths} onNext={state.onNextMonths} />}

        {isDayPicker &&
          <DayPicker class={viewStyle}
            year={state.year} month={state.month} days={state.days}
            onYear={onDayToMonthPicker} onActivate={onActivate}
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
