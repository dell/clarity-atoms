import { css } from '@emotion/css';
import { Button } from '../../../src/Button';
import { border, primary } from '../../../src/color';

const rootStyle = css`
  display: grid;
  margin-top: 1rem;

  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
`;

const boxStyle = css`
  padding: 2rem;
  background-color: #F8F8F8;
  border: 1px solid ${border};
`;

export function ButtonVariation() {
  return (
    <div class={rootStyle}>
      <div class={boxStyle}>
        <Button variant='solid'>
          Solid Button
        </Button>
        <p>
          Solid button represents high level of emphasis and thus used for
          <strong> primary call to action - CTA</strong>.
          Use them sparingly. E.g. Ecommerce buy now action.
        </p>
      </div>

      <div class={boxStyle}>
        <Button variant='outline'>
          Outline Button
        </Button>
        <p>
          It represents medium emphasis. It signifies important but not
          primary kind of actions in the application.
        </p>
      </div>

      <div class={boxStyle}>
        <Button variant='flat'>
          Flat Button
        </Button>
        <p>
          Flat Button is as good as a text on a page with added differentiation of color-based emphasis.
          Flat button is used for non-intrusive actions within the application.
        </p>
      </div>
    </div>
  );
}
