import { css } from '@emotion/css';

import { primary } from '../../src/color';
import { SVGIcon } from '../../src/icons/SVGIcon';


export interface AppHeaderProps {

}


const rootStyle = css`
  display: flex;
  padding: 0.5rem 1rem;

  align-items: stretch;

  /* line-height: normal; */

  background-color: ${primary};
  color: #FFFFFF;
`;

const headingStyle = css`
  margin: 0;

  font-size: 27px;
  line-height: 40px;
`;

const navLinkStyle = css`
  line-height: 1;

  cursor: pointer;

  font-family: 'Sansita', sans-serif;
  color: #FFFFFF;
  letter-spacing: 0.6px;
  text-decoration: none;
`;

const taglineStyle = css`
  display: flex;
  margin: 10px 1rem 6px;
  padding: 0 0.5rem;

  align-items: flex-end;

  border-left: 1px solid;

  line-height: 1;
`;

const githubLinkStyle = css`
  display: flex;
  margin-left: auto;
  padding: 0 1rem;

  align-items: center;

  transition: all 80ms ease-out;

  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const iconStyle = css`
  width: 1.5rem;
  margin-right: 1rem;

  fill: currentColor;
`;


export function AppHeader(props: AppHeaderProps) {

  return (
    <header class={rootStyle}>
      <h1 class={headingStyle}>
        <a class={navLinkStyle} href="/">
          ClaRity AtOmS
        </a>
      </h1>
      <div class={taglineStyle}>Sensible components for Enterprise Apps</div>
      <a class={githubLinkStyle} href='https://github.com/dell/clarity-atoms' target='_blank'>
        <SVGIcon class={iconStyle} name='github' />
        GitHub
      </a>
    </header>
  );
}
