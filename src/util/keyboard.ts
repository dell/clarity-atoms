
export interface KeyboardHandlerProps {
  Tab?: (e: KeyboardEvent) => void;
  Enter?: (e: KeyboardEvent) => void;
  Space?: (e: KeyboardEvent) => void;
  ArrowUp?: (e: KeyboardEvent) => void;
  ArrowDown?: (e: KeyboardEvent) => void;
  ArrowLeft?: (e: KeyboardEvent) => void;
  ArrowRight?: (e: KeyboardEvent) => void;
  Escape?: (e: KeyboardEvent) => void;
  CatchAll?: (e: KeyboardEvent) => void;
}


export function makeKeyboardHandler(props: KeyboardHandlerProps) {
  return (e: KeyboardEvent) => {

    const key = e.key as any;
    const handler = (props as any)[key];

    if (handler) {
      handler(e);
    } else if (props.CatchAll) {
      props.CatchAll(e);
    }
  };
}

export function prevent(callback: (e: Event) => void) {
  return (e: Event) => {
    e.preventDefault();
    callback(e);
  };
}
