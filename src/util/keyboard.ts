
export interface KeyboardHandlerProps {
  Tab?: (e: KeyboardEvent) => void;
  Enter?: (e: KeyboardEvent) => void;
  Space?: (e: KeyboardEvent) => void;
  ArrowUp?: (e: KeyboardEvent) => void;
  ArrowDown?: (e: KeyboardEvent) => void;
  Escape?: (e: KeyboardEvent) => void;
}


export function makeKeyboardHandler(props: KeyboardHandlerProps) {
  return (e: KeyboardEvent) => {

    const key = e.key as any;
    const handler = (props as any)[key];

    handler?.(e);
  };
}

export function prevent(callback: (e: Event) => void) {
  return (e: Event) => {
    e.preventDefault();
    callback(e);
  };
}
