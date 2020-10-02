import { h, render } from 'preact';

import { App } from './app/App';


document.addEventListener('DOMContentLoaded', () => {

  const rootElm = document.createElement('div');

  document.body.appendChild(rootElm);

  // Render Site App
  render(h(App, null), rootElm);

}, false);
