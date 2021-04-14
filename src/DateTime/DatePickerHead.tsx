import { css, cx } from '@emotion/css';
import { useState } from 'preact/hooks';

import { Button } from '../Button';
import { SVGIcon } from '../icons/SVGIcon';
import { qs } from '../util/dom';
import { makeKeyboardHandler, prevent } from '../util/keyboard';

import { borderStyle, disabledStyle } from './style';


export interface DatePickerHeadProps {
  class?: string;

  label: string | number;

  navigation?: boolean;

  onAction?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}


const headStyle = css`
  display: flex;
  padding: 0.5rem 0.5rem 0;

  justify-content: space-between;
`;


const monthStyle = css`
  ${borderStyle};

  padding: 0.25rem 0.5rem;

  .chev {
    margin-left: 0.5rem;
    width: 0.625rem;
    height: 0.625rem;

    transform: rotateX(180deg);
  }

  &:focus {
    background: var(--ca-button-focus);
  }

  &[disabled] {
    cursor: default;
  }
`;

const arrowStyle = css`
  width: 2.25rem;
  height: 2.25rem;

  ${borderStyle};

  &:focus {
    background: var(--ca-button-focus);
  }

  &:disabled {
    ${disabledStyle};
  }

  &.down {
    margin-left: 0.25rem;
    transform: rotateX(180deg);
  }

  .svg-icon {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export function DatePickerHead(props: DatePickerHeadProps) {

  const { label, onAction, navigation, onPrev, onNext } = props;

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

  const rover = useRovingIndex(['year', 'prev', 'next'], rootRef!);

  const onKeyDown = makeKeyboardHandler({
    ArrowLeft(e) {
      e.preventDefault();

      rover.prev();
    },

    ArrowRight(e) {
      e.preventDefault();

      rover.next();
    },

    ArrowUp: prevent(() => void 0),
    ArrowDown: prevent(() => void 0)
  });


  return (
    <div class={cx(headStyle, props.class)} onKeyDown={onKeyDown} ref={setRootRef}>
      <Button {...rover.prop('year')} class={monthStyle} variant='minimal'
        disabled={!onAction} onClick={onAction}>
          <span>{label}</span>
          {onAction && <SVGIcon class={'chev'} name='chevThick' />}
      </Button>
      {navigation && (
        <div>
          <Button {...rover.prop('prev')} class={cx(arrowStyle, 'up')} variant='minimal'
            disabled={!onPrev} onClick={onPrev}>
              <SVGIcon name='chevThick' />
          </Button>
          <Button {...rover.prop('next')} class={cx(arrowStyle, 'down')} variant='minimal'
            disabled={!onNext} onClick={onNext}>
              <SVGIcon name='chevThick' />
          </Button>
        </div>)}
    </div>
  );
}

// TODO: Can this be generalized?
// Also, find out if you can trust the DOM.
function useRovingIndex<T extends string>(sequence: T[], scope: HTMLElement) {

  const [current, setCurrent] = useState(0);

  return {
    next() {
      const newVal = current === sequence.length - 1 ? 0 : current + 1;
      const elm = qs(scope, `[data-roving='${sequence[newVal]}']`);

      setCurrent(newVal);
      elm?.focus();
    },

    prev() {
      const newVal = current === 0 ? sequence.length - 1 : current - 1;
      const elm = qs(scope, `[data-roving='${sequence[newVal]}']`);

      setCurrent(newVal);
      elm?.focus();
    },

    prop(x: T) {
      return {
        tabIndex: sequence[current] === x  ? 0 : -1,
        'data-roving': x
      };
    }
  };

}
