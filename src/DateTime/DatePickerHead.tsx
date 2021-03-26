import { css, cx } from '@emotion/css';

import { Button } from '../Button';
import { SVGIcon } from '../icons/SVGIcon';


export interface DatePickerHeadProps {
  class?: string;

  label: string | number;

  onAction?: () => void;
  navigation?: boolean;
}


const headStyle = css`
  display: flex;
  padding: 0.5rem 0.5rem 0;

  justify-content: space-between;
`;

export const borderStyle = css`
  border: 1px solid transparent;
  transition: all 120ms ease-out;

  &:hover {
    border-color: var(--ca-border-hover);
  }
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
`;

const arrowStyle = css`
  width: 2.25rem;
  height: 2.25rem;

  ${borderStyle};

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

  const { label, onAction, navigation } = props;

  return (
    <div class={cx(headStyle, props.class)}>
      <Button class={monthStyle} variant='minimal' onClick={onAction}>
        <span>{label}</span>
        {onAction && <SVGIcon class={'chev'} name='chevThick' />}
      </Button>
      {navigation && (
        <div>
          <Button class={cx(arrowStyle, 'up')} variant='minimal'>
            <SVGIcon name='chevThick' />
          </Button>
          <Button class={cx(arrowStyle, 'down')} variant='minimal'>
            <SVGIcon name='chevThick' />
          </Button>
        </div>)}
    </div>
  );
}
