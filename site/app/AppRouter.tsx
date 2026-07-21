import { css, cx } from '@emotion/css';
import Router from 'preact-router';

import ButtonDocs from '../pages/Button/Button.mdx';
import CalendarDocs from '../pages/DateTime/Calendar.mdx';
import CheckboxDocs from '../pages/Checkbox/Checkbox.mdx';
import DatePickerDocs from '../pages/DateTime/DatePicker.mdx';
import DialogDocs from '../pages/Dialog/Dialog.mdx';
import DropdownDocs from '../pages/Dropdown/Dropdown.mdx';
import RadioDocs from '../pages/Radio/Radio.mdx';
import SimpleSelectDocs from '../pages/SimpleSelect/SimpleSelect.mdx';

import { Home } from './Home';


export interface AppRouterProps {
  class?: string;
}


const routerStyle = css`
  position: relative;
  overflow: hidden;
`;

export function AppRouter(props: AppRouterProps) {
  return (
    <div class={cx('page-outlet', routerStyle, props.class)}>
      <Router>
        <Home path='/' />
        <ButtonDocs path='/button' />
        <CalendarDocs path='/calendar' />
        <CheckboxDocs path='/checkbox' />
        <DatePickerDocs path='/datepicker' />
        <DialogDocs path='/dialog' />
        <DropdownDocs path='/dropdown' />
        <RadioDocs path='/radio' />
        <SimpleSelectDocs path='/simple-select' />
      </Router>
    </div>
  );
}
