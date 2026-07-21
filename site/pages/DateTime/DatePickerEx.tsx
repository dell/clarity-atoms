import { useState } from 'preact/hooks';
import { DatePicker } from 'clarity-atoms/DateTime/DatePicker';


export default function DatePickerEx() {

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <DatePicker value={selectedDate} onChange={setSelectedDate} />
    </div>
  )
}
