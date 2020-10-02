import { h } from 'preact';
import { RoutableProps } from 'preact-router';

import { navLinkStyle } from './App';

type AppNavProps = RoutableProps

export function AppNav(props: AppNavProps) {
  return (
    <div>
      <nav>
        <ol>
          <li><a class={navLinkStyle} href="/checkbox">Checkbox</a></li>
        </ol>
      </nav>
    </div>
  );
}
