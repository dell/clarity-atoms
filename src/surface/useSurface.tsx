import { Ref } from 'preact';
import { useState } from 'preact/hooks';


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

  surfaceProps: {
    ref: Ref<any>;
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
