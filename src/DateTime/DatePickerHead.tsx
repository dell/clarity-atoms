import { css, cx } from '@emotion/css';
import { useState } from 'preact/hooks';

import { Button } from '../Button';
import { SVGIcon } from '../icons/SVGIcon';
import { makeKeyboardHandler, prevent } from '../util/keyboard';

import { borderStyle, disabledStyle } from './style';
import { useRovingIndex } from './useRoving';


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

  const rovingList = [];

  onAction && rovingList.push('year');
  onPrev && rovingList.push('prev');
  onNext && rovingList.push('next');

  const rover = useRovingIndex(rovingList, { scope: rootRef!, wrapAround: true });

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
