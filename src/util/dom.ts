export function qs(elm: ParentNode, selector: string): HTMLElement | null {
  return elm.querySelector(selector) as HTMLElement | null;
}
