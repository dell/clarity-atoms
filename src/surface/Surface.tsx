import { css, cx } from '@emotion/css';
import { ComponentChildren, Ref } from 'preact';
import { useState } from 'preact/hooks';

import { Layer } from './Layer';


export interface UseSurfaceHook {
  isOpen: boolean;
  open: () => void;
  close: () => void;

  anchor: HTMLElement | null;
  surface: HTMLElement | null;

  anchorProps: {
    ref: Ref<any>;
    [key: string]: any;
  };

  layerClass?: string;

  surfaceProps: {
    ref: Ref<any>;
    class?: string;
    [key: string]: any;
  };
}


export function useSurface(): UseSurfaceHook {

  const [isOpen, setIsOpen] = useState(false);

  // Use as a Ref<Element>
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [surface, setSurface] = useState<HTMLElement | null>(null);

  // NOTE: open and close must be stable functions.
  // They are used in the side effect.
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

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
      ref: setSurface
    }
  };
}


export interface SurfaceProps {
  class?: string;
  layerClass?: string;

  hook: UseSurfaceHook;
  children: ComponentChildren;
}


const overlayStyle = css`
  background-color: rgba(0, 0, 0, 0.015);
`;


export function Surface(props: SurfaceProps) {

  const { hook, children, layerClass } = props;

  const layerClasses = cx(hook.layerClass, layerClass);
  const classes = cx(hook.surfaceProps.class, props.class);

  return (
    <Layer class={layerClasses} backdropClass={overlayStyle}
      attached={hook.isOpen} onBackdropClick={hook.close}>
        <div {...hook.surfaceProps} class={classes} tabIndex={-1}>
          {children}
        </div>
    </Layer>
  );
}
