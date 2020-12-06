import { css } from '@emotion/css';
import { h } from 'preact';
import { RoutableProps } from 'preact-router';


const listItemStyle = css`
  margin: 0.75rem 0;
`;

export interface HomeProps extends RoutableProps {}


export function Home(_props: HomeProps) {
  return (
    <div>
      <nav>
        <h4>Components :-</h4>
        <ol>
          <li class={listItemStyle}><a href="/button">Button</a></li>
          <li class={listItemStyle}><a href="/checkbox">Checkbox</a></li>
          <li class={listItemStyle}><a href="/radio">Radio</a></li>
        </ol>
      </nav>
    </div>
  );
}
