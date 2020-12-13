import { css } from '@emotion/css';
import { RoutableProps } from 'preact-router';


export interface HomeProps extends RoutableProps {}


export function Home(_props: HomeProps) {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
}
