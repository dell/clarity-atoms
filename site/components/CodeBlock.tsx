import { css, cx } from '@emotion/css';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

// import dracula from 'prism-react-renderer/themes/dracula';
// import duotoneDark from 'prism-react-renderer/themes/duotoneDark';
// import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
// import github from 'prism-react-renderer/themes/github';
// import nightOwl from 'prism-react-renderer/themes/nightOwl';
// import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';
// import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import palenight from 'prism-react-renderer/themes/palenight';
// import shadesOfPurple from 'prism-react-renderer/themes/shadesOfPurple';
// import synthwave84 from 'prism-react-renderer/themes/synthwave84';
// import ultramin from 'prism-react-renderer/themes/ultramin';
// import vsDark from 'prism-react-renderer/themes/vsDark';


export interface CodeViewerProps {
  class?: string;
  children: string;
}

export function CodeBlock(props: CodeViewerProps) {

  const { children } = props;

  const language = (props.class?.replace(/language-/, '') ?? 'javascript') as any as Language;

  // Trim leading whitespace and new line character from the code
  const code = children.replace(/^\s+|\s+$/g, '');

  return (
    <Highlight {...defaultProps} theme={palenight} code={code} language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre class={className} style={{...style, padding: '1rem' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i }) as any}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key }) as any} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}


const inlineRootStyle = css`
  display: inline-flex;
  margin: 0;
  padding: 0 0.2rem;

  border-radius: 0.25rem;
  border: 1px solid rgba(41, 45, 62, 0.2);

  line-height: 1.125;

  background: #F0F0F0;
`;


export function CodeBlockInline(props: CodeViewerProps) {
  return (
    <pre class={cx(inlineRootStyle, props.class)}>
      {props.children}
    </pre>
  );
}
