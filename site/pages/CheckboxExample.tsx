import { css } from '@emotion/css';
import { RoutableProps } from 'preact-router';
import { useState } from 'preact/hooks';

import { Checkbox } from '../../src/Checkbox';

const checkboxWrapper = css`
  display: flex;
  flex-direction: column;
`;

const selectedOptionsWrapper = css`
  margin-top: 1rem;
`;

// Argument props is required for 'path' attribute in AppRouter.tsx
export function CheckboxExample(props: RoutableProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [isSmartphoneOptionSelected, toggleSmartphoneOption] = useState(false);
  const [isSmartTVOptionSelected, toggleSmartTVOption] = useState(false);
  const [isLaptopOptionSelected, toggleLaptopOption] = useState(false);
  const [isSmartWatchOptionSelected, toggleSmartWatchOption] = useState(false);

  const onToggleSmartphoneOption = (checked: boolean) => {
    toggleSmartphoneOption(checked);
    updateSelectedOptions(checked, 'Smartphone');
  };

  const onToggleSmartTVOption = (checked: boolean) => {
    toggleSmartTVOption(checked);
    updateSelectedOptions(checked, 'Smart TV');
  };

  const onToggleLaptopOption = (checked: boolean) => {
    toggleLaptopOption(checked);
    updateSelectedOptions(checked, 'Laptop');
  };

  const onToggleSmartWatchOption = (checked: boolean) => {
    toggleSmartWatchOption(checked);
    updateSelectedOptions(checked, 'Smart Watch');
  };

  const updateSelectedOptions = (checked: boolean, option: string) => {
    checked
      ? setSelectedOptions(selectedOptions.concat(option))
      : setSelectedOptions(selectedOptions.filter((x) => x !== option));
  };

  return (
    <div>
      <h3>Component :- Checkbox</h3>
      <div>Which of the following devices do you have?</div>
      <div class={checkboxWrapper}>
        <Checkbox checked={isSmartphoneOptionSelected} onChange={onToggleSmartphoneOption}>Smartphone</Checkbox>
        <Checkbox checked={isSmartTVOptionSelected} onChange={onToggleSmartTVOption}>Smart TV</Checkbox>
        <Checkbox checked={isLaptopOptionSelected} onChange={onToggleLaptopOption}>Laptop</Checkbox>
        <Checkbox checked={isSmartWatchOptionSelected} onChange={onToggleSmartWatchOption}>Smart Watch</Checkbox>
      </div>

      { selectedOptions.length
        ? <div class={selectedOptionsWrapper}>
            <span><strong>Selected Options</strong> :- </span>
            <span>{selectedOptions.join(', ')}</span>
          </div>
        : null
      }
    </div>
  );
}
