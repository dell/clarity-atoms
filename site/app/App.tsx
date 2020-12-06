import { MDXProvider } from '@mdx-js/preact';
import { css, injectGlobal } from '@emotion/css';
import { h } from 'preact';

import { CodeBlock } from '../components/CodeBlock';

import { AppRouter } from './AppRouter';

injectGlobal`

  /* Normalize the stylesheet */
  /* @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'); */

  /* Using typeface 'Sarabun' */
  @import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

  /* Using typeface 'Fira Code' for code snippets */
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

  html,
  body {
    font-family: 'Sarabun', sans-serif;
    margin: 0;
    padding: 0;
  }

  pre {
    font-family: 'Fira Code', monospace;
    font-weight: 500;
  }
`;


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
