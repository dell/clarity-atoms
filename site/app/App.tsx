import { MDXProvider } from '@mdx-js/preact';
import { css, cx } from '@emotion/css';

import { CodeBlock } from '../components/CodeBlock';

import { AppHeader } from './AppHeader';
import { AppNav } from './AppNav';
import { AppRouter } from './AppRouter';


const rootStyle = css`
  display: grid;
  width: 100%;
  height: 100vh;

  grid-template-rows: auto 1fr;
`;

const sectionStyle = css`
  display: grid;
  grid-template-columns: 320px 1fr;
`;

const outletStyle = css`
  width: 100%;
  padding: 1.5rem;
  max-width: 980px;

  justify-self: center;

  border-left: 1px solid #F8F8F8;
  border-right: 1px solid #F8F8F8;
`;

const components = {
  pre: (props: any) => <div class='code-block' {...props} />,
  code: CodeBlock
};

export function App() {

  return (
    <MDXProvider components={components}>
      <div class={cx('app', rootStyle)}>
        <AppHeader />
        <div class={sectionStyle}>
          <AppNav />
          <AppRouter class={outletStyle} />
        </div>
      </div>
    </MDXProvider>
  );
}
