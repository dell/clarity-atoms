import { css, cx } from '@emotion/css';
import { JSX } from 'preact';


export interface PlaygroundProps {

  // Component to render
  Component: () => JSX.Element;

  // Code snippet to render
  code?: string;
}

const rootStyle = css`
  border: 1px solid rgba(41, 45, 62, 0.1);
  padding: 1rem;
`;

export function Playground(props: PlaygroundProps) {

  const { Component } = props;

  return (
    <div class={cx('playground', rootStyle)}>
      <Component />
      {/* <CodeBlock class='language-ts'>{code}</CodeBlock> */}
    </div>
  );
}
