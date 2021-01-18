import { css, cx } from '@emotion/css';
import { ComponentChildren, Ref } from 'preact';
import { useState, useLayoutEffect } from 'preact/hooks';
import { noop } from 'rxjs';
import styler from 'stylefire';

import { borderSecondary } from '../color';
import { Surface } from '../portal/Surface';

import { makePlacement$ } from './strategy/bottom';


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

  // Positioning effect and animation
  useLayoutEffect(() => {

    if (isOpen && anchor && surface) {

      const surfaceStyler = styler(surface);
      const stream$ = makePlacement$('auto', anchor, surface);

      // Highlight the surface.
      surface.focus();

      const sub = stream$
        .subscribe((x) => {
          surfaceStyler.set(x);
        });

      return () => sub.unsubscribe();

    } else {
      return noop;
    }

  }, [isOpen, anchor, surface]);


  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    anchor?.focus();
  }

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
  margin-top: 0.5rem;

  flex-direction: column;

  background: #FFFFFF;
  border: 1px solid ${borderSecondary};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
  outline: none;

  overflow: auto;
`;

export const dropdownItemStyle = css`
  padding: 1rem 1.5rem;

  &:hover {
    text-decoration: none;
    background-color: #F0F0F0;
  }
`;


const surfaceStyle = css`
  perspective: 800px;
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
