import { useEffect, useMemo, useState } from 'preact/hooks';

export interface UseDateProps {
  min?: Date;
  max?: Date;
  value?: Date[];

  disabled?: Date[];
}

export interface DayInfo {
  // 0 - Sunday, 6 - Saturday
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  dayOfMonth: number;
  disabled: boolean;
  selected: boolean;
  isToday: boolean;
}

export interface MonthInfo {
  year: number;
  month: number;
  days: DayInfo[];
}

export interface UseDateHook {
  canNext: boolean;
  canPrevious: boolean;

  month: MonthInfo;

  setNext: () => void;
  setPrevious: () => void;
  build: (month: number, year: number) => DayInfo[];
}


export function useDate(props: UseDateProps): UseDateHook {

  const { min, max, value, disabled } = props;

  // The value 'current' is the current date when this hook is spawned
  const [current, dMin, dMax] =
    useMemo(() => {
      const current = new Date();
      const minDate = new Date().setFullYear(current.getFullYear() - 120, 0);
      const maxDate = new Date().setFullYear(current.getFullYear() + 121, 0);

      return [current, minDate, maxDate];
    }, []);

  // The 'pointer' points to the current pointer set by the user navigation
  const [pointer, setPointer] = useState(() => new Date(current));

  const disabledSet = useMemo(() => new Set((disabled || []).map(dateToNumber)), [disabled]);
  const valueSet = useMemo(() => new Set((value || []).map(dateToNumber)), [value]);

  const month: MonthInfo = useMemo(() => {
    const month = pointer.getMonth();
    const year = pointer.getFullYear();

    const days = build(month, year, disabledSet, valueSet, current);

    return { month, year, days };

  }, [pointer, disabledSet, valueSet, current]);


  const minDate = min ? min.getTime() : dMin;
  const maxDate = max ? max.getTime() : dMax;

  // Re-adjust the pointer
  useEffect(() => {
    if (value) {
      setPointer(findMax(value));
    } else {
      setPointer(new Date(current));
    }
  }, [value]);


  const set = (month: number, year: number) => {
    return build(month, year, disabledSet, valueSet, current);
  };

  const setNext = () => {
    const current = pointer.getMonth();

    const newPointer = new Date(pointer);

    if (current === 11) {
      newPointer.setFullYear(pointer.getFullYear() + 1);
      newPointer.setMonth(0);
    } else {
      newPointer.setMonth(current + 1);
    }

    setPointer(newPointer);

    return set(newPointer.getMonth(), newPointer.getFullYear());
  };

  const setPrevious = () => {
    const current = pointer.getMonth();

    const newPointer = new Date(pointer);

    if (current === 0) {
      newPointer.setFullYear(pointer.getFullYear() - 1);
      newPointer.setMonth(11);
    } else {
      newPointer.setMonth(current - 1);
    }

    setPointer(newPointer);

    return set(newPointer.getMonth(), newPointer.getFullYear());
  };

  const getYearList = () => {};

  const getMonthList = () => {};

  const canNext: boolean = true;
  const canPrevious: boolean = true;


  return {
    build: set,
    setNext,
    setPrevious,
    canNext,
    canPrevious,
    month
  };
}

function build(month: number, year: number, disabled: Set<number>, value: Set<number>, current: Date) {
  // Start of the Month
  const firstDay = new Date(year, month).getDay();

  // Number of Days - Date values round around for the given month if the value '40' is greater than the
  // number of days allowed in a month. So substracting the new value from '40' gives us actual days in that month.
  const dayOfMonth = new Date(year, 11, 40).getDate();
  const totalDays = 40 - dayOfMonth;

  const days = new Array(totalDays)
    .fill(0)
    .map((_, index) => {
      const date = new Date(year, month, index + 1);

      const dayInfo: DayInfo = {
        dayOfWeek: (firstDay + index) % 7 as any,
        dayOfMonth: date.getDate(),
        disabled: dateInSet(disabled, date),
        selected: dateInSet(value, date),
        isToday: isDateEq(date, current)
      };

      return dayInfo;
    });

  return days;
};


function findMax(dates: Date[]) {
  // When passed to Math.max, date values are automatically converted to numbers
  return new Date(Math.max(...dates as any));
}

function findMin(dates: Date[]) {
  // When passed to Math.min, date values are automatically converted to numbers
  return new Date(Math.min(...dates as any));
}

function dateInSet(set: Set<number>, date: Date) {
  return set.has(date.getTime());
}

function dateToNumber(x: Date) {
  return new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
}

function isDateEq(d1: Date, d2: Date) {
  return (
    d1.getDate() == d2.getDate() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getFullYear() == d2.getFullYear()
  );
}
