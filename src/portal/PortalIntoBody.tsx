import { css } from '@emotion/css';
import { ComponentChildren, Ref } from 'preact';
import { forwardRef } from 'preact/compat';
import { useEffect, useLayoutEffect, useState } from 'preact/hooks';

import { setRef } from '../helper/preact';

import { Portal } from './Portal';


export type PortalIntoBodyProps = {
  class?: string;
  children: ComponentChildren;

  // Reference to the DOM Element created by this component
  // portalElm?: Ref<HTMLDivElement | null>;
};


const styles = css`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 11;
`;


export const PortalIntoBody = forwardRef(
  function PortalIntoBodyImpl(props: PortalIntoBodyProps, ref: Ref<HTMLElement>) {

    const { class: classes, children } = props;

    const [mountElm] = useState(() => {
      const elm = document.createElement('div');

      elm.classList.add(styles);
      elm.classList.add('portal-into-body');

      return elm;
    });

    // When mount element is available, append to the body.
    // Destroy it when component is destroyed.
    useEffect(() => {
      document.body.appendChild(mountElm);

      return () => document.body.removeChild(mountElm);
    }, [mountElm]);


    // Add or remove classes from portal body
    useEffect(() => {
      classes && mountElm.classList.add(classes);

      return () => classes && mountElm.classList.remove(classes);
    }, [classes, mountElm]);


    // Manually set reference, since `mountElm` is a floating element
    // TODO: Not sure if this needs to be inside the effect or not
    useLayoutEffect(() => {
      setRef(ref, mountElm);
    }, [ref, mountElm]);


    return (
      <Portal mountElm={mountElm}>{children}</Portal>
    );
  });

PortalIntoBody.displayName = 'PortalIntoBody';
