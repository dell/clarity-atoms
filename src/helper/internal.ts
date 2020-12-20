import { createContext } from 'preact';
import { noop } from 'rxjs';


// Context that is requried by the dialog box component
export const DialogContext = createContext({ onClose: noop });
