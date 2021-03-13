import { css, cx } from '@emotion/css';
import { ComponentChildren, Ref } from 'preact';
import { useState, useLayoutEffect, useEffect } from 'preact/hooks';
import { fromEvent, noop } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import styler from 'stylefire';

import { borderSecondary } from '../color';
import { Surface } from '../portal/Surface';

import { getRect$, makeAnimation$, makePlacement } from './strategy';


export interface UseDropdownEffectHookProps {
  followWidth: boolean;
}

export interface UseDropdownEffectHook {
  isOpen: boolean;
  open: () => void;
  close: () => void;

  anchor: HTMLElement | null;
  surface: HTMLElement | null;

  anchorProps: {
    ref: Ref<any>;
    [key: string]: any;
  };

  surfaceProps: {
    ref: Ref<any>;
    [key: string]: any;
  };
}


export function useDropdownEffect(): UseDropdownEffectHook {

  const [isOpen, setIsOpen] = useState(false);

  // Use as a Ref<Element>
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [surface, setSurface] = useState<HTMLElement | null>(null);

  // NOTE: open and close must be stable functions.
  // They are used in the side effect.
  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    anchor?.focus();
  };

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
      const sub1 = makeAnimation$(values.strategy)
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
  }, [isOpen, anchor, surface]);


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

  // Handle escape key.
  // For non-escape key, bubble up the event.
  const onKeydown = (e: KeyboardEvent) => {

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();

      close();
    }
  };


  return {
    isOpen,
    open,
    close,
    anchor,
    surface,
    anchorProps: {
      ref: setAnchor
    },
    surfaceProps: {
      ref: setSurface,
      onKeydown
    }
  };
}

export interface DropdownSurfaceProps {
  class?: string;
  surfaceClass?: string;

  dd: UseDropdownEffectHook;
  children: ComponentChildren;
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
  pointer-events: all;

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

export const dropdownItemStyle = css`
  padding: 1rem 1.5rem;

  &:hover {
    text-decoration: none;
    background-color: #F0F0F0;
  }
`;


const surfaceStyle = css`
  width: 100%;
  height: 100%;

  perspective: 800px;

  pointer-events: none;
`;

const overlayStyle = css`
  background-color: rgba(0, 0, 0, 0.015);
`;


export function DropdownSurface(props: DropdownSurfaceProps) {

  const { dd, children, surfaceClass } = props;

  return (
    <Surface class={cx(surfaceStyle, surfaceClass)} overlayClass={overlayStyle}
      attached={dd.isOpen} onBackdropClick={dd.close}>
        <div {...dd.surfaceProps} class={cx(dropdownStyle, props.class)} tabIndex={-1}>
          {children}
        </div>
    </Surface>
  );
}
