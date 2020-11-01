import { ComponentChildren } from 'preact';
import { createPortal } from 'preact/compat';

export interface PortalProps {
  mountElm: HTMLElement;
  children: ComponentChildren;
};


/**
 * Preact component that renders nothing.
 * Instead it enders `children` into given `mountElm`.
 * @param props
 */
export function Portal(props: PortalProps) {

  const { children, mountElm } = props;


  // Portal element renders nothing
  return createPortal(children as any, mountElm);
}
