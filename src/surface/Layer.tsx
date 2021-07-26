import { css, cx } from '@emotion/css';
import { ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';

import { transparentOverlay, darkOverlay } from '../portal/overlay';
import { PortalIntoBody } from '../portal/PortalIntoBody';
import { addClass, removeClass } from '../util/dom';


export interface LayerProps {
  class?: string;
  children: ComponentChildren;

  attached: boolean;

  backdrop?: 'transparent' | 'dark';
  backdropClass?: string;
  blocking?: boolean;
  onBackdropClick?: () => void;
}


const hideScrollStyle = css`
  overflow: hidden;
`;


const hideScroll = () => addClass(document.body, hideScrollStyle);
const resumeScroll = () => removeClass(document.body, hideScrollStyle);


function useBodyHideScroll(enabled: boolean) {
  useEffect(() => {
    if (enabled) {
      hideScroll();

      return resumeScroll;
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
  useBodyHideScroll(attached);

  const surface = () => (
    <PortalIntoBody class={cx('layer', props.class)}>
      {blocking && <div class={cx('backdrop', overlayStyle, backdropClass)} onClick={onBackdropClick}></div>}
      {children}
    </PortalIntoBody>
  );

  return attached ? surface() : null;
}
