import { css } from 'emotion';
import { h } from 'preact';
import { RoutableProps } from 'preact-router';

import { navLinkStyle } from './App';

type AppNavProps = RoutableProps

const listItemStyle = css`
  margin: 0.75rem 0;
`;

// Argument props is required for 'path' attribute in AppRouter.tsx
export function AppNav(props: AppNavProps) {
  return (
    <div>
      <nav>
        <h4>Components :-</h4>
        <ol>
          <li class={listItemStyle}><a class={navLinkStyle} href="/checkbox">Checkbox</a></li>
          <li class={listItemStyle}><a class={navLinkStyle} href="/radio">Radio</a></li>
        </ol>
      </nav>
    </div>
  );
}
