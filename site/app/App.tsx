import { css, cx } from '@emotion/css';
import { MDXProvider } from '@mdx-js/preact';
import { useState } from 'preact/hooks';


import { useMediaQuery } from '../../src/hooks';

import { CodeBlock, CodeBlockInline } from '../components/CodeBlock';
import { Playground } from '../components/Playground';

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
  position: relative;
  min-width: 0;
  min-height: 0;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 270px 1fr;
  }

  @media (min-width: 900px) {
    grid-template-columns: 320px 1fr;
  }
`;

const permanentMenuStyle = css`
  min-height: 0;

  overflow: auto;
`;

const slidingMenuStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  overflow: auto;

  transform: translateX(-100%);

  transition: all 240ms ease-out;

  &.isOpen {
    transform: translateX(0);
  }
`;

const contentStyle = css`
  height: 100%;
  overflow: auto;
`;

const routerStyle = css`
  margin: 0 auto;
  padding: 1.5rem;
  max-width: 980px;
  min-height: 100%;

  box-sizing: border-box;

  border-left: 1px solid #F8F8F8;
  border-right: 1px solid #F8F8F8;
`;

const components = {
  pre: (props: any) => <div class='code-block' {...props} />,
  code: CodeBlock,
  Playground,
  'inline-code': CodeBlockInline
};


export function App() {

  const isLargeScreen = useMediaQuery('(min-width: 768px)');

  // Small screen or large screen
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <MDXProvider components={components}>
      <div class={cx('app', rootStyle)}>
        <AppHeader onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
        <section class={cx(sectionStyle)}>
          <AppNav class={cx(isLargeScreen ? permanentMenuStyle : slidingMenuStyle, isMenuOpen && 'isOpen')} />
          <div class={contentStyle}>
            <AppRouter class={routerStyle} />
          </div>
        </section>
      </div>
    </MDXProvider>
  );
}
