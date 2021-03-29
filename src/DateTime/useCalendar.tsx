import { useEffect, useMemo, useState } from 'preact/hooks';


export type YearMonth = [number | null, number | null];

export interface DayInfo {
  // 0 - Sunday, 6 - Saturday
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  dayOfMonth: number;
  disabled: boolean;
  selected: boolean;
  isToday: boolean;
}

export interface MonthInfo {
  abbr: string;
  full: string;
  disabled: boolean;
}

export interface YearInfo {
  year: number;
  months: MonthInfo[];
}

export interface UseCalendarProps {
  min?: Date;
  max?: Date;
  value?: Date[];

  disabled?: Date[];
}

export function useCalendar(props: UseCalendarProps) {

  const { min, max, value, disabled } = props;

  const disabledSet = useMemo(() => new Set((disabled || []).map(dateToNumber)), [disabled]);
  const valueSet = useMemo(() => new Set((value || []).map(dateToNumber)), [value]);

  const [current, absMin, absMax] =
    useMemo(() => {
      const current = new Date();
      const minDate = new Date();
      const maxDate = new Date();

      minDate.setFullYear(current.getFullYear() - 70, current.getMonth(), 1);
      minDate.setHours(0, 0, 0 ,0);

      maxDate.setFullYear(current.getFullYear() + 50, current.getMonth(), 0);
      maxDate.setHours(0, 0, 0 ,0);

      return [current, minDate, maxDate];
    }, []);

  const minDate = min ? min : absMin;
  const maxDate = max ? max : absMax;

  return {
    current,
    min: minDate,
    max: maxDate,
    disabled: disabledSet,
    value: valueSet
  };
}


export interface UseCenturyProps {
  size: number;

  seedYear: number;
  minYear: number;
  maxYear: number;
}


export const months = [
  ['Jan', 'January'], ['Feb', 'February'], ['Mar', 'March'],
  ['Apr', 'April'], ['May', 'May'], ['Jun', 'June'],
  ['Jul', 'July'], ['Aug', 'August'], ['Sep', 'September'],
  ['Oct', 'October'], ['Nov', 'November'], ['Dec', 'December']
];

export function useCentury(props: UseCenturyProps) {

  const { seedYear, minYear, maxYear, size } = props;

  // pageYear holds the reference year around which current page's bounds are drawn.
  const [local, setLocal] = useState<null | number>(null);

  const year = local ?? seedYear;

  // If size is 20, lMedian = 10 & hMedian = 9;
  // If size is 21, lMedian = 10 & hMedian = 10;
  const lMedian = Math.floor(size / 2);
  const uMedian = size - lMedian - 1;

  const startYear = Math.max(year - lMedian, minYear);
  const endYear = Math.min(year + uMedian, maxYear);

  // Count the endYear also in the calculations.
  const diff = endYear - startYear + 1;

  const adjustedEndYear = diff < size
    ? Math.min(startYear + size - 1, maxYear)
    : endYear;

  const finalDiff = adjustedEndYear - startYear + 1;

  // Update page year whenever input year is changed.
  useEffect(() => setLocal(seedYear), [seedYear]);

  // There is no point in clicking previous if minYear is hit.
  const prev = (startYear > minYear)
    ? () => setLocal(Math.max(startYear - lMedian, minYear))
    : undefined;

  const next = (adjustedEndYear < maxYear)
    ? () => setLocal(Math.min(adjustedEndYear + size - uMedian, maxYear))
    : undefined;

  const list = new Array(finalDiff).fill(0)
    .map((_, index) => startYear + index)

  return { list, prev, next };
}


export interface UseYearProps {
  size?: number;
  seedYear: number;
  min: Date;
  max: Date;
}

export function useYear(props: UseYearProps) {

  const { min, max, size = 2 } = props;

  const [local, setLocal] = useState<null | number>(null);

  const year = local ?? props.seedYear;

  const minYear = min.getFullYear();
  const maxYear = max.getFullYear();

  const minYearMonth = min.getMonth();
  const maxYearMonth = max.getMonth();

  const prevSize = Math.min(year - min.getFullYear(), size);
  const nextSize = Math.min(maxYear - year, size);

  const prev = prevSize > 0
    ? () => setLocal(year - prevSize)
    : undefined;

  // There is a scope in calling next only if it is a non-leaf page.
  // If nextSize is less than size, it means you are at the end of the view
  // or allowed range.
  const next = size === nextSize
    ? () => setLocal(year + nextSize)
    : undefined;

  const years: YearInfo[] = new Array(Math.min(nextSize + 1, size)).fill(0)
    .map((_, index) => year + index)
    .map((year) => ({
      year,
      months: months.map(([abbr, full], index) => ({
        abbr, full,
        disabled: (year <= minYear && index < minYearMonth)
          || (year >= maxYear && index > maxYearMonth)
      }))
    }));


  return { years, prev, next };
}


export interface UseMonthProps {
  min: Date;
  max: Date;
  year: number;
  month: number;
}

export function useMonth(props: UseMonthProps) {

  const { min, max } = props;

  const [local, setLocal] = useState<YearMonth>([null, null]);

  const year = local[0] ?? props.year;
  const month = local[1] ?? props.month;

  const days = useMemo(() =>
    buildDays(month, year, min, max, new Set(), new Set(), new Date()),
  [month, year, min, max]);

  // Reset local selection when date changes
  useEffect(() => setLocal([null, null]), [props.year, props.month]);

  const prev = () => {
    if (month === 0) {
      setLocal([year - 1, 11]);
    } else {
      setLocal([year, month - 1]);
    }
  };

  const next = () => {
    if (month === 11) {
      setLocal([year + 1, 0]);
    } else {
      setLocal([year, month + 1]);
    }
  };


  return { days, year, month, prev, next };
}


function buildDays(month: number, year: number, min: Date, max: Date, disabled: Set<number>, value: Set<number>, current: Date): DayInfo[] {
  // Start of the Month
  const firstDay = new Date(year, month).getDay();

  // Number of Days - Date values round around for the given month if the value '40' is greater than the
  // number of days allowed in a month. So substracting the new value from '40' gives us actual days in that month.
  const dayOfMonth = new Date(year, month, 40).getDate();
  const totalDays = 40 - dayOfMonth;

  const days = new Array(totalDays)
    .fill(0)
    .map((_, index) => {
      const date = new Date(year, month, index + 1);
      const isDisabled =  dateInSet(disabled, date) || date < min || date > max;

      const dayInfo: DayInfo = {
        dayOfWeek: (firstDay + index) % 7 as any,
        dayOfMonth: date.getDate(),
        disabled: isDisabled,
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
