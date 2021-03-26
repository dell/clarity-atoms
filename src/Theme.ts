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
  const primarySemiLight = primary.lighten(0.1).rgb().string();
  const primaryLight = primary.lighten(0.2).rgb().string();

  const primaryHover = primary.alpha(0.08).string();
  const primaryFocus = primary.alpha(0.16).string();

  injectGlobal`
    :root {
      --ca-primary: ${x.primary};
      --ca-primary-comp: ${x.primaryComp};
      --ca-primary-semilight: ${primarySemiLight};
      --ca-primary-light: ${primaryLight};

      --ca-border: ${x.border};
      --ca-border-secondary: ${x.borderLight};

      --ca-disabled: ${x.disabled};
      --ca-disabled-light: ${x.disabledLight};

      /* Specific styling for components */

      /* Styling for button components */
      --ca-button-hover: ${primaryHover};
      --ca-button-focus: ${primaryFocus};

      /* Styling for DatePicker */
      --ca-border-hover: ${Color(x.border).lighten(0.18).string()};
    }
  `;

  return {

  };
}
