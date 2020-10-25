import { Ref } from 'preact';

/**
 * Normalizes setting of reference value.
 * @param ref - Either RefObject or RefCallback
 * @param value - Actual value to set
 */
export function setRef<T>(ref: Ref<T> | undefined, value: T) {
  if (ref) {
    if (typeof ref === 'function') {
      ref(value);
    } else {
      ref.current = value;
    }
  }
}
