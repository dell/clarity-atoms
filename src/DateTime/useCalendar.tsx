import { useEffect, useState } from 'preact/hooks';


export function useCalendar() {

}


export interface UseCenturyProps {
  size: number;

  seedYear: number;
  minYear: number;
  maxYear: number;
}

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
  const onPrev = (startYear > minYear)
    ? () => setLocal(Math.max(startYear - lMedian, minYear))
    : undefined;

  const onNext = (adjustedEndYear < maxYear)
    ? () => setLocal(Math.min(adjustedEndYear + size - uMedian, maxYear))
    : undefined;

  const list = new Array(finalDiff).fill(0)
    .map((_, index) => startYear + index)

  return { list, onPrev, onNext };
}
