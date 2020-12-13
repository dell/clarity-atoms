import { cx } from '@emotion/css';
import Router from 'preact-router';

import ButtonDocs from '../pages/Button.mdx';
import SimpleSelect from '../pages/SimpleSelect/SimpleSelect.mdx';

import { CheckboxExample } from '../pages/CheckboxExample';
import { RadioExample } from '../pages/RadioExample';

import { Home } from './Home';


export interface AppRouterProps {
  class?: string;
}

export function AppRouter(props: AppRouterProps) {
  return (
    <div class={cx('page-outlet', props.class)}>
      <Router>
        <Home path='/' />
        <ButtonDocs path='/button' />
        <CheckboxExample path='/checkbox'/>
        <RadioExample path='/radio'/>
        <SimpleSelect path='/simple-select' />
      </Router>
    </div>
  );
}
