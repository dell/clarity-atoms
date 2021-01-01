import { css } from '@emotion/css';

import { Button } from 'clarity-atoms/Button';

const rootStyle = css`
  display: grid;

  grid-template-columns: repeat(3, min-content);
  grid-gap: 1rem;
`;

export default function Example1() {
  return (
    <div class={rootStyle}>
      <Button variant='solid'>Buy Now</Button>
      <Button variant='outline'>Cancel</Button>
      <Button variant='flat'>Learn More</Button>
    </div>
  );
}
