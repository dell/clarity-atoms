import { css, cx } from '@emotion/css';


const noFillStyle = css`
  fill: none;
  stroke: currentColor;
  stroke-miterlimit: 10;
`;

export function ClarityAtomsLogo(props: { class?: string; }) {

  return (
    <svg class={cx(props.class)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33">
      <title>Clarity Atoms</title>
      <path class={noFillStyle}
        d="M28.17,4.38c-2.86-2-9.78,1.77-14.7,8.82S6.9,27.58,9.76,29.57s9.15-2.11,14.07-9.16l4.35,6.3c-2.86,2-9.78-1.77-14.7-8.82S6.9,3.51,9.76,1.52s9.15,2.11,14.07,9.16l3.89-6.56"
        transform="translate(0.5 0.5)" />
      <circle cx="17.39" cy="9.46" r="1.79" />
      <circle cx="10.46" cy="29.98" r="1.79" />
      <path class={noFillStyle}
        d="M9.24,15.06c-.81-.87-2.45-3.23-3.41-8.65a.72.72,0,0,0-1.26-.35C3,8,.28,12.65,2.28,21A12.22,12.22,0,0,0,4.82,25.8a.73.73,0,0,0,1.28-.38c.24-2.33,1-6.83,3.16-9.42A.7.7,0,0,0,9.24,15.06Z"
        transform="translate(0.5 0.5)" />
      <path class={noFillStyle}
        d="M15.87.56a14.91,14.91,0,0,1,4.2,3.26.25.25,0,0,0,.32.08,12.84,12.84,0,0,1,4.38-1.4A.26.26,0,0,0,24.88,2,20.26,20.26,0,0,0,20.2.24,18.36,18.36,0,0,0,16,.07.27.27,0,0,0,15.87.56Z"
        transform="translate(0.5 0.5)" />
      <path class={noFillStyle}
        d="M15.95,30.8a14.91,14.91,0,0,0,4.2-3.26.25.25,0,0,1,.32-.08,12.84,12.84,0,0,0,4.38,1.4.26.26,0,0,1,.11.49,20.26,20.26,0,0,1-4.68,1.76,18.36,18.36,0,0,1-4.22.18A.27.27,0,0,1,15.95,30.8Z"
        transform="translate(0.5 0.5)" />
    </svg>

  )
}
