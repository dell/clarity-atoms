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
    margin: 0;
    padding: 0;

    color: #444444;

    /* line-height: 1.5; */

    font-family: 'Fira Sans', sans-serif;
  }

  pre {
    font-family: 'Fira Code', monospace;
    font-weight: 500;
  }

  h1 {
    font-size: 4rem;
    font-weight: 600;
  }

  h2 {
    margin: 3rem 0 0;
    font-weight: 500;
  }

  h3, h4 {
    margin: 2rem 0 0;
    font-weight: 500;
  }


  p {
    margin: 0.75rem 0 0;
  }

  blockquote {
    margin: 1rem 0 1.5rem;
    padding: 0.5rem;

    border-left: 4px solid #CCCCCC;

    background: #FAFAFA;
    color: #777;
    font-weight: 500;
    font-style: italic;
    letter-spacing: 0.2px;
  }
`;
