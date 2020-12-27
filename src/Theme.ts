import { injectGlobal } from '@emotion/css';
import Color from 'color';


export interface Theme {
  primary: string;
  primaryComp: string;

  border: string;
  borderLight: string;

  disabled: string;
  disabledLight: string;
}

export function setupTheme(theme: Theme) {

  const x = theme;

  const primary = Color(x.primary);
  const primarySemiDark = primary.darken(0.1).rgb().string();
  const primaryLight = primary.lighten(0.1).rgb().string();

  injectGlobal`
    :root {
      --ca-primary: ${x.primary};
      --ca-primary-comp: ${x.primaryComp};
      --ca-primary-semidark: ${primarySemiDark};
      --ca-primary-light: ${primaryLight};

      --ca-border: ${x.border};
      --ca-border-secondary: ${x.borderLight};

      --ca-disabled: ${x.disabled};
      --ca-disabled-light: ${x.disabledLight};
    }
  `;

  return {

  };
}
