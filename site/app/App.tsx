import { css } from 'emotion';
import { h } from 'preact';

import { AppRouter } from './AppRouter';

const appStyle = css`
  font-family: sans-serif;
`;

export const navLinkStyle = css`
    color: #0076CE;
    text-decoration: none;
    cursor: pointer;
`;

export function App() {
  return (
    <div class={appStyle}>
      <h1>
        <a class={navLinkStyle} href="/">Clarity Atom Examples</a>
      </h1>

      <AppRouter />
    </div>
  );
}
