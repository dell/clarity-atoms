import { useLayoutEffect, useEffect } from 'preact/hooks';
import { fromEvent, noop } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import styler from 'stylefire';

import { getRect$, makeAnimation$, makePlacement } from './strategy';
import { useSurface, UseSurfaceHook } from './useSurface';


export interface UseSurfaceHookProps {
  followWidth?: boolean;
}


export function useDropdownSurface(props: UseSurfaceHookProps = {}): UseSurfaceHook {

  const { followWidth = false } = props;

  const srfc = useSurface();

  const { anchor, surface, isOpen } = srfc;

  // Positioning effect and animation
  useLayoutEffect(() => {

    if (isOpen && anchor && surface) {

      const surfaceStyler = styler(surface);
      const oRect = anchor.getBoundingClientRect();
      const values = makePlacement(anchor, surface);

      // Highlight the surface.
      surface.focus();

      // Add the directional class
      surface.classList.add(values.strategy);

      // Set initial values
      surfaceStyler.set(values);

      // Run animation
      const sub1 = makeAnimation$(followWidth)
        .subscribe((x) => {
          surfaceStyler.set(x);
        });

      // Whenever anchor's position change, close the popper.
      const sub2 = getRect$(anchor)
        .subscribe(({x,y}) => {
          if (oRect.x !== x || oRect.y !== y) {
            // Close is stable function and hence
            close();
          }
        });

      return () => {
        surface.classList.remove(values.strategy);
        sub1.unsubscribe();
        sub2.unsubscribe();
      };

    } else {
      return noop;
    }
  }, [isOpen, anchor, surface, followWidth]);


  // If clicked anywhere on document except anchor or surface, close the popper.
  useEffect(() => {
    if (isOpen && anchor && surface) {
      const click$ = fromEvent(document, 'click').pipe(
        map((e) => e.composedPath()),
        filter((path) => !(path.includes(anchor) || path.includes(surface))));

      const sub = click$.subscribe(() => close());

      return () => sub.unsubscribe();
    } else {
      return noop;
    }
  }, [isOpen, anchor, surface]);

  return srfc;
}
