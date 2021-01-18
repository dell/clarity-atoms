
import { css } from '@emotion/css';
import { Fragment } from 'preact';
import { useMemo } from 'preact/hooks';

import { Button } from 'clarity-atoms/Button';
import { Dropdown } from 'clarity-atoms/Dropdown/Dropdown';
import { Divider, ListItem } from 'clarity-atoms/List/ListItem';

const headingStyle = css`
  margin: 0.25rem 0.5rem;
  padding: 0.5rem;

  color: #777777;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
`;

const surfaceStyle = css`
  width: 300px;
`;

const menuItemStyle = css`
  margin: 0.25rem 0.5rem;
  padding: 0.5rem;

  font-size: 14px;
  font-weight: 500;
`;


// Sample data
interface DropdownOption {
  icon: string;
  label: string;
  category: string;
  disabled?: boolean;
}

const dropdownOptions: DropdownOption[] = [
  { icon: '', label: 'Pause data', category: 'data' },
  { icon: '', label: 'Resume data', category: 'data' },
  { icon: '', label: 'Set data limits/overage', category: 'overage' },
  { icon: '', label: 'Resume data', category: 'overage' },
  { icon: '', label: 'Enable tunneling', category: 'tunneling', disabled: true },
  { icon: '', label: 'Disable tunneling', category: 'tunneling' },
  { icon: '', label: 'Send message', category: 'messaging' },
  { icon: '', label: 'Transfer to organization', category: 'device' },
  { icon: '', label: 'Deactivate SIM', category: 'device' },
];

const categories = ['data', 'overage', 'tunneling', 'messaging', 'device'];


export default function DropdownExample() {

  const options: { [key: string]: DropdownOption[] } = useMemo(() =>
    dropdownOptions.reduce((acc, next) => {
      acc[next.category] = acc[next.category] ?? [];

      acc[next.category].push(next);

      return acc;
    }, {} as any),
  [dropdownOptions]);


  const surfaceElm = (close: any, highlighted?: DropdownOption) => (
    <div class={surfaceStyle}>
      {categories.map((category, index) => {
        return (
          <Fragment>
            {index > 0 && <Divider type='secondary' />}
            <div class={headingStyle}>{category}</div>
            {options[category].map((item) => (
              <ListItem class={menuItemStyle}
                disabled={item.disabled} focused={item === highlighted}
                context={item} onSelect={() => close()}>{item.label}</ListItem>
            ))}
          </Fragment>
        );
      })}
    </div>
  );

  return (
    <div>
      <Dropdown surface={surfaceElm} options={dropdownOptions}>
        <Button>
          Manage
        </Button>
      </Dropdown>
    </div>
  );
}
