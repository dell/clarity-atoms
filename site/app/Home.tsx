import { css } from '@emotion/css';
import { RoutableProps } from 'preact-router';

import { HomeImage } from '../components/HomeImage';


export interface HomeProps extends RoutableProps {}


const homeImageStyle = css`

  position: fixed;
  top: 3rem;
  right: -1rem;

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

  &:hover {
    opacity: 0.9;
  }
`;


export function Home(_props: HomeProps) {
  return (
    <div>
      <HomeImage class={homeImageStyle} />
      <h1>Clarity Atoms</h1>
      <a href='https://www.freepik.com/vectors/background' target='_blank'>Background vector created by freepik - www.freepik.com</a>
    </div>
  );
}
