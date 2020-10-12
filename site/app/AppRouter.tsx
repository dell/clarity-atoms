import { h } from 'preact';
import Router from 'preact-router';

import ButtonDocs from '../pages/Button.mdx';
import { CheckboxExample } from '../pages/CheckboxExample';

import { Home } from './Home';

export function AppRouter() {
  return (
    <Router>
        <Home path='/' />
        <ButtonDocs path='/button' />
        <CheckboxExample path='/checkbox'/>
      </Router>
  );
}
