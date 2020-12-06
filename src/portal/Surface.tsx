import { cx } from '@emotion/css';
import { h, ComponentChildren } from 'preact';

import { transparentOverlay, darkOverlay } from './overlay';
import { PortalIntoBody } from './PortalIntoBody';


export interface SurfaceProps {
  class?: string;
  overlayClass?: string;
  children: ComponentChildren;

  overlay?: 'transparent' | 'dark';
  attached: boolean;
  onBackdropClick?: () => void;
}


export function Surface(props: SurfaceProps) {

  const { children, attached, overlay, overlayClass, onBackdropClick } = props;

  const overlayStyle = overlay === 'dark' ? darkOverlay : transparentOverlay;

  const surface = () => (
    <PortalIntoBody class={props.class}>
      <div class={cx('backdrop', overlayStyle, overlayClass)} onClick={onBackdropClick}></div>
      {children}
    </PortalIntoBody>
  );

  return attached ? surface() : null;
}
