import { h } from 'preact';
import Router from 'preact-router';

import { CheckboxExample } from '../components/CheckboxExample';
import { RadioExample } from '../components/RadioExample';

import { AppNav } from './AppNav';

export function AppRouter() {
  return (
    <Router>
        <AppNav path="/"/>
        <CheckboxExample path="/checkbox"/>
        <RadioExample path="/radio"/>
    </Router>
  );
}
