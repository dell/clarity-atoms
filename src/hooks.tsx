import { useEffect, useState } from 'preact/hooks';
import { fromEvent } from 'rxjs';


export function useMediaQuery(mediaQuery: string) {

  // Run first time on creation
  const [currentValue, setCurrentValue] = useState(() =>
    window.matchMedia(mediaQuery).matches);

  useEffect(() => {

    const matchBreak = window.matchMedia(mediaQuery);
    const stream = fromEvent(matchBreak, 'change');

    const nextFn = () => setCurrentValue(matchBreak.matches);
    const subscription = stream.subscribe(nextFn);

    // Clean-up effect
    return () => subscription.unsubscribe();

  }, [mediaQuery]);

  return currentValue;

}
