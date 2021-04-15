export function qs(elm: ParentNode | null | undefined, selector: string): HTMLElement | null {
  return elm?.querySelector(selector) ?? null;
}
