declare module '*.mdx' {
  import { JSX } from 'preact';

  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
