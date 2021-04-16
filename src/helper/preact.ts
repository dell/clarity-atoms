import { Ref } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';

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


export function useLatestRef<T>(value: T) {

  const ref = useRef(value);

  useLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}
