import { cx } from '@emotion/css';
import { ComponentChildren } from 'preact';

import { transparentOverlay, darkOverlay } from '../portal/overlay';
import { PortalIntoBody } from '../portal/PortalIntoBody';


export interface LayerProps {
  class?: string;
  children: ComponentChildren;

  attached: boolean;

  backdrop?: 'transparent' | 'dark';
  backdropClass?: string;
  blocking?: boolean;
  onBackdropClick?: () => void;
}


export function Layer(props: LayerProps) {

  const { children, attached, backdrop: overlay, blocking, backdropClass, onBackdropClick } = props;

  const overlayStyle = overlay === 'dark' ? darkOverlay : transparentOverlay;

  const surface = () => (
    <PortalIntoBody class={props.class}>
      {blocking && <div class={cx('backdrop', overlayStyle, backdropClass)} onClick={onBackdropClick}></div>}
      {children}
    </PortalIntoBody>
  );

  return attached ? surface() : null;
}
