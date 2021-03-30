import { css, cx } from '@emotion/css';

import { Button } from '../Button';
import { SVGIcon } from '../icons/SVGIcon';

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

  &[disabled] {
    cursor: default;
  }
`;

const arrowStyle = css`
  width: 2.25rem;
  height: 2.25rem;

  ${borderStyle};

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

  return (
    <div class={cx(headStyle, props.class)}>
      <Button class={monthStyle} variant='minimal' disabled={!onAction}
        onClick={onAction}>
          <span>{label}</span>
          {onAction && <SVGIcon class={'chev'} name='chevThick' />}
      </Button>
      {navigation && (
        <div>
          <Button class={cx(arrowStyle, 'up')} variant='minimal' disabled={!onPrev}
            onClick={onPrev}>
              <SVGIcon name='chevThick' />
          </Button>
          <Button class={cx(arrowStyle, 'down')} variant='minimal' disabled={!onNext}
            onClick={onNext}>
              <SVGIcon name='chevThick' />
          </Button>
        </div>)}
    </div>
  );
}
