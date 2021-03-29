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
  onSelect?: (value: Date) => void;
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

// TODO: Reverse animation sequence
enum Motion {
  MonthToYear,
  YearToCentury,
  CenturyToYear,
  YearToMonth
}

const yearView = '.cla-year-view';
const monthView = '.cla-month-view';
const centuryView = '.cla-century-view';


export function Calendar(props: CalendarProps) {

  const state = useCalendar({});

  const [view, setView] = useState<'month' | 'year' | 'century'>('month');
  const [ref, setRef] = useState<null | HTMLDivElement>(null);
  const [motion, setMotion] = useState<null | Motion>(null);

  // Temporary transient state for internal selection
  const [local, setLocal] = useState<YearMonth>([null, null]);

  const year = local[0] ?? state.current.getFullYear();
  const month = local[1] ?? state.current.getMonth();

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
    setLocal(value);
    setMotion(Motion.MonthToYear);
  };

  const onCentury = (year: number) => {
    setView('century');
    setMotion(Motion.YearToCentury);
    setLocal([year, null]);
  };

  const onCenturyToYear = (year: number) => {
    setView('year');
    setMotion(Motion.CenturyToYear);
    setLocal([year, null]);
  };

  const onMonth = (value: YearMonth) => {
    setView('month');
    setMotion(Motion.YearToMonth);
    setLocal(value);
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
          <CenturyView class={viewStyle} minYear={1900} maxYear={2100}
            year={year} onYear={onCenturyToYear} />}

        {isYearView &&
          <YearView class={viewStyle} year={year}
            onCentury={onCentury} onMonth={onMonth} />}

        {isMonthView &&
          <MonthView class={viewStyle} year={year} month={month}
            onYear={onMonthToYear} />}
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
