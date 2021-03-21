import { css } from '@emotion/css';
import { useLayoutEffect, useEffect } from 'preact/hooks';
import { fromEvent, merge, noop } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import styler from 'stylefire';


import { borderSecondary } from '../color';
import { useSurface, UseSurfaceHook } from '../surface/Surface';

import { getRect$, makeAnimation$, makePlacement } from './strategy';


export interface UseSurfaceHookProps {
  followWidth?: boolean;
}


const dropdownStyle = css`
  position: absolute;
  display: flex;

  flex-direction: column;

  background: #FFFFFF;
  border: 1px solid ${borderSecondary};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
  outline: none;

  overflow: auto;
  pointer-events: auto;

  &.left-top {
    left: 0;
    top: 0;
    transform-origin: left top;
  }

  &.left-bottom {
    left: 0;
    bottom: 0;
    transform-origin: left bottom;
  }

  &.right-top {
    right: 0;
    top: 0;
    transform-origin: right top;
  }

  &.right-bottom {
    right: 0;
    bottom: 0;
    transform-origin: right bottom;
  }
`;


const layerStyle = css`
  width: 100%;
  height: 100%;

  perspective: 800px;

  pointer-events: none;
`;


export function useDropdownSurface(props: UseSurfaceHookProps = {}): UseSurfaceHook {

  const { followWidth = false } = props;

  const srfc = useSurface();

  const { anchor, surface, isOpen, close } = srfc;

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

      const resize$ = fromEvent(window, 'resize');

      const sub =  merge(click$, resize$).subscribe(close);

      return () => sub.unsubscribe();
    } else {
      return noop;
    }
  }, [isOpen, anchor, surface]);

  return {
    ...srfc,
    layerClass: layerStyle,
    surfaceProps: {
      ...srfc.surfaceProps,
      class: dropdownStyle
    }
  };
}
