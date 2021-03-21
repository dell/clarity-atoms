import { css, cx } from '@emotion/css';
import { ComponentChildren } from 'preact';

import { borderSecondary } from '../color';

import { Layer } from './Layer';
import { UseSurfaceHook } from './useSurface';

export interface SurfaceProps {
  class?: string;
  surfaceClass?: string;

  hook: UseSurfaceHook;
  children: ComponentChildren;
}


const dropdownStyle = css`
  position: absolute;
  display: flex;

  flex-direction: column;

  background: #FFFFFF;
  border: 1px solid ${borderSecondary};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
  outline: none;

  overflow: auto;
  pointer-events: auto;

  &.left-top {
    left: 0;
    top: 0;
    transform-origin: left top;
  }

  &.left-bottom {
    left: 0;
    bottom: 0;
    transform-origin: left bottom;
  }

  &.right-top {
    right: 0;
    top: 0;
    transform-origin: right top;
  }

  &.right-bottom {
    right: 0;
    bottom: 0;
    transform-origin: right bottom;
  }
`;

export const dropdownItemStyle = css`
  padding: 1rem 1.5rem;

  &:hover {
    text-decoration: none;
    background-color: #F0F0F0;
  }
`;


const surfaceStyle = css`
  width: 100%;
  height: 100%;

  perspective: 800px;

  pointer-events: none;
`;

const overlayStyle = css`
  background-color: rgba(0, 0, 0, 0.015);
`;


export function Surface(props: SurfaceProps) {

  const { hook, children, surfaceClass } = props;

  return (
    <Layer class={cx(surfaceStyle, surfaceClass)} backdropClass={overlayStyle}
      attached={hook.isOpen} onBackdropClick={hook.close}>
        <div {...hook.surfaceProps} class={cx(dropdownStyle, props.class)} tabIndex={-1}>
          {children}
        </div>
    </Layer>
  );
}
