import { cx } from '@emotion/css';

export interface CenturyViewProps {
  class?: string;
  minYear: number;
  maxYear: number;
}

export function CenturyView(props: CenturyViewProps) {

  return (
    <div class={cx('cla-century-view', props.class)}>
      This is century view.
    </div>
  );
}
