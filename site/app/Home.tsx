import { css } from '@emotion/css';
import { RoutableProps } from 'preact-router';

import { HomeImage } from '../components/HomeImage';
import { ClarityAtomsLogo } from '../components/Logo';


export interface HomeProps extends RoutableProps {}


const homeImageStyle = css`
  position: fixed;
  top: 3rem;
  right: -1rem;
  z-index: -1;

  width: 120%;

  @media (min-width: 540px) {
    width: 100%;
  }

  @media (min-width: 720px) {
    width: 80%;
  }

  @media (min-width: 900px) {
    width: 60%;
  }

  @media (min-width: 1200px) {
    width: 50%;
  }

  @media (min-width: 1440px) {
    width: 40%;
  }


  transform: rotateY(180deg);

  opacity: 0.5;

  transition: all 300ms ease-out;
`;

const homeLogoStyle = css`
  width: 5rem;
  height: 5rem;

  margin-top: 4rem;
`;

const titleStyle = css`
  margin-top: 0rem;
`;


export function Home(_props: HomeProps) {
  return (
    <div>
      <HomeImage class={homeImageStyle} />
      <ClarityAtomsLogo class={homeLogoStyle} />
      <h1 class={titleStyle}>Clarity Atoms</h1>

      <a href='https://www.freepik.com/vectors/background' target='_blank'>
        Background vector on this page is created by freepik - www.freepik.com
      </a>
    </div>
  );
}
