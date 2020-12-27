import { css, cx } from '@emotion/css';
import Router from 'preact-router';

import ButtonDocs from '../pages/Button/Button.mdx';
import DialogDocs from '../pages/Dialog/Dialog.mdx';
import SimpleSelectDocs from '../pages/SimpleSelect/SimpleSelect.mdx';

import { CheckboxExample } from '../pages/CheckboxExample';
import { RadioExample } from '../pages/RadioExample';

import { Home } from './Home';


export interface AppRouterProps {
  class?: string;
}


const routerStyle = css`
  position: relative;
  overflow: hidden;
`;

export function AppRouter(props: AppRouterProps) {
  return (
    <div class={cx('page-outlet', routerStyle, props.class)}>
      <Router>
        <Home path='/' />
        <ButtonDocs path='/button' />
        <CheckboxExample path='/checkbox'/>
        <DialogDocs path='/dialog'/>
        <RadioExample path='/radio'/>
        <SimpleSelectDocs path='/simple-select' />
      </Router>
    </div>
  );
}
