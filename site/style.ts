import { injectGlobal } from '@emotion/css';

/* Normalize the stylesheet */
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'); */

/* Using typeface 'Sarabun' */

/* Using typeface 'Fira Code' for code snippets */
injectGlobal`
  @import url('https://fonts.googleapis.com/css2?family=Sansita:wght@700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');


  html,
  body {
    font-family: 'Fira Sans', sans-serif;
    margin: 0;
    padding: 0;

    color: #444444;
  }

  pre {
    font-family: 'Fira Code', monospace;
    font-weight: 500;
  }
`;
