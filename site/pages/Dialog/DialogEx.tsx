import { useState } from 'preact/hooks';

import { Button } from '../../../src/Button';
import { Dialog } from '../../../src/Dialog/Dialog';


export default function DialogEx() {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant='solid' onClick={() => setOpen(true)}>
        Open Dialog
      </Button>

      <Dialog open={open} onEscape={() => setOpen(false)}>
        <Dialog.Header>Simple Dialog</Dialog.Header>
        <Dialog.Section>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Dialog.Section>
      </Dialog>
    </div>
  );
}
