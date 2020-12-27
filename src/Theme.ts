import { injectGlobal } from '@emotion/css';


export interface Theme {
  primary: string;
  border: string;
  borderLight: string;
  disabled: string;
  disabledLight: string;
}

export function setupTheme(theme: Theme) {

  const x = theme;

  injectGlobal`
    :root {
      --ca-primary: ${x.primary};
      --ca-border: ${x.border};
      --ca-border-secondary: ${x.borderLight};
      --ca-disabled: ${x.disabled};
      --ca-disabled-light: ${x.disabledLight};
    }
  `;

  return {

  };
}
