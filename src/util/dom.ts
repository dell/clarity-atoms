
export function qs(elm: ParentNode | null | undefined, selector: string): HTMLElement | null {
  return elm?.querySelector(selector) ?? null;
}


export function addEvent<K extends keyof HTMLElementEventMap>(
  eventName: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  target: HTMLElement | Document,
  capture?: boolean) {

  target.addEventListener(eventName, listener as any, capture);

  return () => target.removeEventListener(eventName, listener as any);
}


export function addClass(element: Element, ...classNames: string[]) {
  element.classList.add(...classNames);

  // Return a function that can be used to remove the added classes.
  return () => removeClass(element, ...classNames);
}

export function removeClass(element: Element, ...classNames: string[]) {
  element.classList.remove(...classNames);
}
