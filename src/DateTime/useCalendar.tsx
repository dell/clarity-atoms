import { useMemo, useState } from 'preact/hooks';


export type YearMonth = [number | null, number | null];

export interface DayInfo {
  // 0 - Sunday, 6 - Saturday
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  dayOfMonth: number;
  disabled: boolean;
  selected: boolean;
  isToday: boolean;
  date: Date;
  inRange: boolean;
}

export interface MonthInfo {
  abbr: string;
  full: string;
  disabled: boolean;
  isCurrent: boolean;
}

export interface YearInfo {
  year: number;
  isCurrent: boolean;
  months: MonthInfo[];
}

export interface UseCalendarProps {
  min?: Date;
  max?: Date;
  value?: Date[];

  disabled?: Date[];
}

export interface UseCalendarState {
  // Year and month selected by user
  year: number;
  month: number;
  current: Date;
  min: Date;
  max: Date;

  // Years to be shown at a time
  years: number[];
  onPrevYears?: () => void;
  onNextYears?: () => void;

  months: YearInfo[];
  onPrevMonths?: () => void;
  onNextMonths?: () => void;

  days: DayInfo[];
  onPrevDays?: () => void;
  onNextDays?: () => void;

  // Force new local state
  set: (yearMonth: YearMonth) => void;
}


export function useCalendar(props: UseCalendarProps): UseCalendarState {

  const { value, disabled } = props;

  // Temporary transient state for internal selection
  // Why is it required?
  // Date selection is a three step process - year, month and then finally day.
  // Before user selects a `day`, it can remain in a transient state by choosing only year
  // or by choosing only till month and waiting for user to select final day.
  const [local, setLocal] = useState<YearMonth>([null, null]);

  const [current, min, max] = useExtrema(props.min, props.max);
  const disabledSet = useDateSet(disabled);
  const valueSet = useDateSet(value);

  const year = local[0] ?? current.getFullYear();
  const month = local[1] ?? current.getMonth();

  const onYear = (year: number) => setLocal([year, null]);

  const cState = buildCentury(year, min, max, onYear);
  const yState = buildYear(year, current, min, max, onYear, 2);
  const mState = buildMonth({
    year, month, min, max,
    onChange: setLocal,
    selected: valueSet,
    disabled: disabledSet
  });

  return {
    year,
    month,

    current,
    min,
    max,

    years: cState.years,
    onPrevYears: cState.prev,
    onNextYears: cState.next,

    months: yState.years,
    onPrevMonths: yState.prev,
    onNextMonths: yState.next,

    days: mState.days,
    onPrevDays: mState.prev,
    onNextDays: mState.next,

    set: setLocal
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

// Here year holds the reference year around which current page's bounds are drawn.
function buildCentury(year: number, min: Date, max: Date, changeCb: (year: number) => void, size: number = 20) {

  const minYear = min.getFullYear(), maxYear = max.getFullYear();

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

  const years = new Array(finalDiff).fill(0)
    .map((_, index) => startYear + index);

  // There is no point in clicking previous if minYear is hit.
  const prev = (startYear > minYear)
    ? () => changeCb(Math.max(startYear - lMedian, minYear))
    : undefined;

  const next = (adjustedEndYear < maxYear)
    ? () => changeCb(Math.min(adjustedEndYear + size - uMedian, maxYear))
    : undefined;

  return { years, prev, next };
}


function buildYear(year: number, current: Date, min: Date, max: Date, changeCb: (year: number) => void, size: number = 1) {

  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth();
  const minYear = min.getFullYear();
  const maxYear = max.getFullYear();
  const minYearMonth = min.getMonth();
  const maxYearMonth = max.getMonth();

  const prevSize = Math.min(year - min.getFullYear(), size);
  const nextSize = Math.min(maxYear - year, size);

  const prev = prevSize > 0
    ? () => changeCb(year - prevSize)
    : undefined;

  // There is a scope in calling next only if it is a non-leaf page.
  // If nextSize is less than size, it means you are at the end of the view
  // or allowed range.
  const next = size === nextSize
    ? () => changeCb(year + nextSize)
    : undefined;

  const years: YearInfo[] = new Array(Math.min(nextSize + 1, size)).fill(0)
    .map((_, index) => year + index)
    .map((year) => ({
      year,
      isCurrent: year === currentYear,
      months: months.map(([abbr, full], index) => ({
        abbr, full,
        isCurrent: year === currentYear && index === currentMonth,
        disabled: (year <= minYear && index < minYearMonth)
          || (year >= maxYear && index > maxYearMonth)
      }))
    }));

  return { years, prev, next }
}


export interface BuildMonthProp {
  year: number;
  month: number;

  min: Date;
  max: Date;

  selected: Set<number>;
  disabled: Set<number>;

  onChange: (yearMonth: YearMonth) => void;

  range?: [Date, Date];
}

function buildMonth(props: BuildMonthProp) {

  const { year, month, min, max, selected, disabled, range, onChange } = props;

  const minYear = min.getFullYear();
  const maxYear = max.getFullYear();
  const minYearMonth = min.getMonth();
  const maxYearMonth = max.getMonth();

  const days = useMemo(() =>
    buildDays(month, year, min, max, disabled || new Set(), selected || new Set(), new Date(), range),
  [month, year, min, max, selected, disabled, range]);

  const prev = (year <= minYear && month <= minYearMonth)
    ? undefined
    : () => {
      if (month === 0) {
        onChange([year - 1, 11]);
      } else {
        onChange([year, month - 1]);
      }
    };

  const next = (year >= maxYear && month >= maxYearMonth)
    ? undefined
    : () => {
      if (month === 11) {
        onChange([year + 1, 0]);
      } else {
        onChange([year, month + 1]);
      }
    };

  return { days, prev, next };
}



function buildDays(month: number, year: number, min: Date, max: Date,
  disabled: Set<number>, value: Set<number>, current: Date, range?: [Date, Date]): DayInfo[] {
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

        const inRange = !!range && date >= range[0] && date <= range[1];

        const dayInfo: DayInfo = {
          date,
          dayOfWeek: (firstDay + index) % 7 as any,
          dayOfMonth: date.getDate(),
          disabled: isDisabled,
          selected: dateInSet(value, date),
          isToday: isDateEq(date, current),
          inRange
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

// Build Extrema = min date (minima) + max date (maxima) and also current time
function useExtrema(min?: Date, max?: Date) {
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

  return [current, minDate, maxDate];
}

function useDateSet(dates?: Date[]): Set<number> {
  return useMemo(() => new Set((dates || []).map(dateToNumber)), [dates]);
}
