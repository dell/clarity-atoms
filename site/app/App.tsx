import { MDXProvider } from '@mdx-js/preact';
import { css } from '@emotion/css';

import { CodeBlock } from '../components/CodeBlock';

import { AppRouter } from './AppRouter';


export const navLinkStyle = css`
  color: #0076CE;
  text-decoration: none;
  cursor: pointer;
`;

const components = {
  pre: (props: any) => <div class='code-block' {...props} />,
  code: CodeBlock
};

export function App() {

  return (
    <MDXProvider components={components}>
      <div>
        <h1>
          <a class={navLinkStyle} href="/">Clarity Atom Examples</a>
        </h1>
        <AppRouter />
      </div>
    </MDXProvider>
  );
}
