import { Fragment } from 'preact';
import { useEffect } from 'preact/hooks';

import { Button } from '../Button';
import { useDropdownSurface } from '../Dropdown/useDropdownSurface';
import { Surface } from '../surface/Surface';

import { Calendar } from './Calendar';


export interface DatePickerProps {
  value?: Date;
  onChange?: (value: Date) => void;
}


export function DatePicker(props: DatePickerProps) {

  const { value, onChange } = props;

  const dds = useDropdownSurface();

  useEffect(() => dds.open(), []);

  return (
    <Fragment>
      <div>
        <span>Date: </span>
        <span>{value?.toDateString() || 'No date selected'}</span>
      </div>
      <Button {...dds.anchorProps} variant='solid' onClick={dds.open}>
        Select Date
      </Button>
      
      <Surface hook={dds}>
        <Calendar value={value ? [value] : undefined} onActivate={onChange} />
      </Surface>
    </Fragment>
  );
}
