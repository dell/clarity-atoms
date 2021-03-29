import { Fragment } from 'preact';
import { useEffect } from 'preact/hooks';

import { useDropdownSurface } from '../Dropdown/useDropdownSurface';
import { Surface } from '../surface/Surface';

import { Calendar } from './Calendar';


export interface DatePickerProps {
  value?: Date;
  onChange?: () => void;
}


export function DatePicker(props: DatePickerProps) {

  const { value, onChange } = props;

  const dds = useDropdownSurface();

  // TODO: Temporary
  useEffect(() => dds.open(), []);

  return (
    <Fragment>
      <div {...dds.anchorProps} onClick={dds.open}>
        Date Picker Anchor
      </div>
      <Surface hook={dds}>
        <Calendar />
      </Surface>
    </Fragment>
  );
}
