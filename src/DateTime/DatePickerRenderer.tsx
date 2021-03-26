import { useState } from 'preact/hooks';

import { MonthView } from './MonthView';
import { MonthInfo } from './useDate';


export interface DatePickerRendererProps {
  month: MonthInfo;
}

export function DatePickerRenderer(props: DatePickerRendererProps) {

  const { month } = props;

  const [view, setView] = useState('month');


  return (
    <div>
      <MonthView month={month} />
    </div>
  );
}




export function YearView() {}

export function CenturyView() {}
