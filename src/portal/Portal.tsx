import { ComponentChildren, render, h } from 'preact';
import { useEffect } from 'preact/hooks';

export interface PortalProps {
  mountElm?: HTMLElement;
  children: ComponentChildren;
};


/**
 * Preact component that renders nothing.
 * Instead it enders `children` into given `mountElm`.
 * @param props
 */
export function Portal(props: PortalProps) {

  const { children, mountElm } = props;

  // When mount element changes or
  // when component getting destroyed,
  // clean current mount element.
  useEffect(() => {
    return () => mountElm && render(null, mountElm);
  }, [mountElm]);


  // As long as mountElm exists, keep re-rendering
  if (mountElm) {
    render(children, mountElm);
  }

  // Portal element renders nothing
  return null;
}
