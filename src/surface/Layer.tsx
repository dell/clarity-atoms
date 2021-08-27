import { css, cx } from '@emotion/css';
import { ComponentChildren } from 'preact';
import { useLayoutEffect } from 'preact/hooks';

import { transparentOverlay, darkOverlay } from '../portal/overlay';
import { PortalIntoBody } from '../portal/PortalIntoBody';
import { addClass } from '../util/dom';


export interface LayerProps {
  class?: string;
  children: ComponentChildren;

  attached: boolean;

  blocking?: boolean;
  backdrop?: 'transparent' | 'dark';
  backdropClass?: string;
  onBackdropClick?: () => void;
}


const hideScrollStyle = css`
  overflow: hidden;
`;


function useBodyHideScroll(enabled: boolean) {
  useLayoutEffect(() => {
    if (enabled) {
      return addClass(document.body, hideScrollStyle);
    }
  }, [enabled]);
}


/**
 * Create a layer that directly appends to the body. The scrollbacr
 * @param props
 * @returns
 */
export function Layer(props: LayerProps) {

  const { children, attached, backdrop, blocking, backdropClass, onBackdropClick } = props;

  const overlayStyle = backdrop === 'dark' ? darkOverlay : transparentOverlay;

  // When Layer is being added, the body's scroll must be deactivated temporarily.
  useBodyHideScroll(attached && !!blocking);

  const surface = () => (
    <PortalIntoBody class={cx('layer', props.class)}>
      {blocking &&
        <div class={cx('backdrop', overlayStyle, backdropClass)} onClick={onBackdropClick} />}
      {children}
    </PortalIntoBody>
  );

  return attached ? surface() : null;
}
