import { css } from '@emotion/css';
import { Calendar } from 'clarity-atoms/DateTime/Calendar';


const rootStyle = css`
  display: flex;
  justify-content: center;
`;

const style = css`
  border: 1px solid #E0E0E0;
`;

export default function CalendarEx() {

  return (
    <div class={rootStyle}>
      <Calendar class={style} />
    </div>
  );
}
