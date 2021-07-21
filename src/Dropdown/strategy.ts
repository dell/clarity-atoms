import { animationFrameScheduler, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { scaleXY, scaleY } from '../helper/animation';

export type DirectionH = 'left' | 'right';
export type DirectionV = 'top' | 'bottom';
export type Strategy = `${DirectionH}-${DirectionV}`;


export function makePlacement(anchor: Element, popper: Element) {
    // Calculate synchronously on each subscription
    // to calculate the initial position.
    const strategy = getStrategy(anchor, popper);
    const dims = calculateDimensions(strategy, anchor, popper);

    return { ...dims, strategy, opacity: 0 };
}

export function makeAnimation$(followWidth: boolean): Observable<any> {
  return followWidth ? scaleY() : scaleXY();
}

export function getRect$(anchor: Element) {
  return interval(0, animationFrameScheduler).pipe(
    map(() => anchor.getBoundingClientRect()));
}


function getStrategy(anchor: Element, popper: Element): Strategy {
  const aRect = anchor.getBoundingClientRect();
  const pRect = popper.getBoundingClientRect();

  return `${getH(aRect, pRect)}-${getV(aRect, pRect)}` as Strategy;
}

function getH(anchor: DOMRect, popper: DOMRect): DirectionH {

  const { left } = anchor;
  const { width } = popper;

  const requiredWidth = left + width;
  const totalWidth = window.innerWidth;

  // Left is natural alignment and hence prefer the left side.
  if (left < (0.7 * totalWidth)) {
    return requiredWidth < totalWidth
      ? 'left' : 'right';
  } else {
    return 'right';
  }
}

function getV({ top }: DOMRect, { }: DOMRect): DirectionV {
  const totalHeight = window.innerHeight;

  // Left is natural alignment and hence prefer the left side.
  return top < (0.6 * totalHeight)
    ? 'top' : 'bottom';
}

function calculateDimensions(strategy: Strategy, anchor: Element, popper: Element) {

  const [x, y] = getXY(strategy, anchor);
  const maxWidth = getMaxWidth(x);
  const maxHeight = getMaxHeight(y);

  if (strategy === 'left-top') {
    return { x, y, maxWidth, maxHeight };
  } else if (strategy === 'left-bottom') {
    return { x, y: -y, maxWidth, maxHeight };
  } else if (strategy === 'right-top') {
    return { x: -x, y, maxWidth, maxHeight };
  } else {
    return { x: -x, y: -y, maxWidth, maxHeight };
  }
}


function getXY(strategy: Strategy,  anchor: Element) {
  const rect = anchor.getBoundingClientRect();

  const getX = strategy === 'left-top' || strategy === 'left-bottom'
    ? fromLeft : fromRight;

  const getY = strategy === 'left-top' || strategy === 'right-top'
    ? fromTop : fromBottom;

  return [getX(rect), getY(rect)];
}

const fromLeft = (anchor: DOMRect) => anchor.left;
const fromTop = (anchor: DOMRect) => anchor.bottom + 8;
const fromBottom = (anchor: DOMRect) => innerHeight - anchor.top + 8;
const fromRight = (anchor: DOMRect) => innerWidth - anchor.right;
const getMaxWidth = (xPos: number) => `${innerWidth - xPos - 36}px`;
const getMaxHeight = (yPos: number) => `${Math.min(vhToPixels(50), innerHeight - yPos - 36)}px`;


function vhToPixels(vh: number) {
  return Math.round(window.innerHeight * vh / 100);
}

function vwToPixels(vw: number) {
  return Math.round(window.innerWidth * vw / 100);
}
