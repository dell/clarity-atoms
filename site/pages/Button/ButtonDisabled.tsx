import { Button } from 'clarity-atoms/Button';

import { rootStyle } from './BaseExample';


export default function ButtonDisabled() {
  return (
    <div class={rootStyle}>
      <Button variant='solid' disabled={true}>Buy Now</Button>
      <Button variant='outline' disabled={true}>Cancel</Button>
      <Button variant='flat' disabled={true}>Learn More</Button>
    </div>
  );
}
