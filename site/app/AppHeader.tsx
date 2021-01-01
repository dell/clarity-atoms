import { css } from '@emotion/css';

import { Button } from '../../src/Button';
import { primary } from '../../src/color';
import { SVGIcon } from '../../src/icons/SVGIcon';

import { ClarityAtomsLogo } from '../components/Logo';


export interface AppHeaderProps {
  onMenuToggle: () => void;
}


const rootStyle = css`
  display: flex;
  padding: 0.5rem 1rem;
  z-index: 2;

  align-items: stretch;
  justify-content: space-between;

  /* line-height: normal; */

  background-color: ${primary};
  color: #FFFFFF;

  @media (min-width: 540px) {
    justify-content: flex-start;
  }
`;


const menuButtonStyle = css`
  margin-right: 1rem;
  padding: 0.25rem 0.4rem;

  align-self: center;

  border: 1px solid rgba(255, 255,255, 0.1);

  @media (min-width: 768px) {
    display: none;
  }
`;

const menuIconStyle = css`
  width: 1rem;
  height: 1rem;
`;

const headingStyle = css`
  margin: 0;

  font-size: 1.25rem;
  line-height: 40px;

  @media (min-width: 540px) {
    font-size: 1.75rem;
  }
`;

const navLinkStyle = css`
  display: flex;
  font-weight: 400;

  align-items: center;
  line-height: 1;

  cursor: pointer;

  color: #FFFFFF;
  text-decoration: none;
`;

const logoStyle = css`
  width: 2rem;
  height: 2rem;

  fill: currentColor;

  @media (min-width: 540px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const titleStyle = css`
  margin-left: 0.5rem;
`;

const taglineStyle = css`
  display: none;

  line-height: 1;

  @media (min-width: 720px) {
    display: flex;
    margin: 10px 1rem 6px;
    padding: 0 0.5rem;

    border-left: 1px solid;

    align-items: flex-end;
  }
`;

const githubLinkStyle = css`
  display: flex;
  padding: 0 0.5rem;

  align-items: center;

  transition: all 80ms ease-out;

  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 540px) {
    margin-left: auto;
    padding: 0 1rem;
  }
`;

const githubIconStyle = css`
  width: 1.5rem;

  fill: currentColor;
`;

const githubTextStyle = css`
  display: none;
  margin-left: 1rem;

  @media (min-width: 768px) {
    display: block;
  }
`;


export function AppHeader(props: AppHeaderProps) {

  const { onMenuToggle } = props;

  return (
    <header class={rootStyle}>
      <Button class={menuButtonStyle} variant='minimal' onClick={onMenuToggle}>
        <SVGIcon class={menuIconStyle} name='menu' />
      </Button>
      <h1 class={headingStyle}>
        <a class={navLinkStyle} href="/">
          <ClarityAtomsLogo class={logoStyle} />
          <span class={titleStyle}>Clarity Atoms</span>
        </a>
      </h1>
      <div class={taglineStyle}>Sensible components for Enterprise Apps</div>
      <a class={githubLinkStyle} href='https://github.com/dell/clarity-atoms' target='_blank'>
        <SVGIcon class={githubIconStyle} name='github' />
        <span class={githubTextStyle}>GitHub</span>
      </a>
    </header>
  );
}
