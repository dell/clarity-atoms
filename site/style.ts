import { injectGlobal } from '@emotion/css';

/* Normalize the stylesheet */
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'); */

/* Using typeface 'Sarabun' */

/* Using typeface 'Fira Code' for code snippets */
injectGlobal`
  @import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');


  html,
  body {
    font-family: 'Sarabun', sans-serif;
    margin: 0;
    padding: 0;
  }

  pre {
    font-family: 'Fira Code', monospace;
    font-weight: 500;
  }
`;
