import { h, render } from 'preact';

import { setupTheme, Theme } from '../src/Theme';

import { App } from './app/App';


const theme: Theme = {
  primary: '#0076CE',
  primaryComp: '#FFFFFF',
  border: '#CCCCCC',
  borderLight: '#E0E0E0',
  disabled: '#CCCCCC',
  disabledLight: '#EEEEEE'
};

document.addEventListener('DOMContentLoaded', () => {

  const rootElm = document.createElement('div');

  document.body.appendChild(rootElm);

  // Setup the Theme
  setupTheme(theme);

  // Render Site App
  render(h(App, null), rootElm);

}, false);
