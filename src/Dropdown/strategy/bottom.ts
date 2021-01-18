import { Observable, Observer, interval, animationFrameScheduler, concat } from 'rxjs';
import { map } from 'rxjs/operators';

import { scaleY } from '../../helper/animation';
import { Coordinates } from '../../helper/position';

export type Alignment = 'left' | 'right' | 'auto';


export function makePlacement$(align: Alignment, anchor: Element, popper: Element): Observable<any> {

  const init$ = new Observable((obs: Observer<any>) => {
    // Calculate synchronously on each subscription
    // to calculate the initial position.
    const strategy = getStrategy(align, anchor, popper);

    // Set initial position
    obs.next({ originX: 'center', originY: 'top' });
    obs.next(calculateNext(strategy, anchor, popper));

    obs.complete();
  });

  // On each frame
  const sticky$ = interval(0, animationFrameScheduler).pipe(
    // Calculate positioning strategy
    map(() => getStrategy(align, anchor, popper)),
    map((strategy) => calculateNext(strategy, anchor, popper)));

  return concat(init$, scaleY(), sticky$);
}


function getStrategy(align: Alignment, anchor: Element, popper: Element): 'left' | 'right' {

  if (align !== 'auto') {
    return align;
  }

  const { left } = anchor.getBoundingClientRect();
  const { width } = popper.getBoundingClientRect();

  const requiredWidth = left + width;

  const totalWidth = window.innerWidth;

  // Left is natural alignment and hence prefer the left side.
  if (left < (0.5 * totalWidth)) {
    return 'left';
  }
  else if (left < (0.7 * totalWidth)) {
    return requiredWidth < totalWidth
      ? 'left'
      : 'right';
  } else {
    return 'right';
  }
}


function calculateNext(strategy: 'left' | 'right', anchor: Element, popper: Element) {

  if (strategy === 'left') {
    const [x, y] = getBottomLeftCords(anchor);
    const maxWidth = `calc(100vw - ${x + 36}px)`;
    const maxHeight = `calc(100vh - ${y + 36}px)`;

    return { x, y, maxWidth, maxHeight };

  } else {
    const [x, y] = getBottomRightCords(anchor, popper);
    const maxWidth = `calc(100vw - ${x + 36}px)`;
    const maxHeight = `calc(100vh - ${y + 36}px)`;

    return { x, y, maxWidth, maxHeight };
  }
}


function getBottomLeftCords(reference: Element): Coordinates {

  const { left, top, height } = reference.getBoundingClientRect();

  const pX = left;
  const pY = top + height;

  return [pX, pY];
}


function getBottomRightCords(reference: Element, popper: Element): Coordinates {

  const { right, top, height } = reference.getBoundingClientRect();
  const { width: popperWidth } = popper.getBoundingClientRect();

  const pX = right - popperWidth;
  const pY = top + height;

  return [pX, pY];
}
