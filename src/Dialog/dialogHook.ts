import { animate } from 'motion';
import { Ref } from 'preact';
import { useRef, useLayoutEffect } from 'preact/hooks';


export type DialogStrategy = 'modal' | 'sidebar-right';


export function useDialog(isOpen: boolean, strategy: DialogStrategy) {

  const ref: Ref<any> = useRef<HTMLElement>(null);


  useLayoutEffect(() => {

    if (isOpen && ref.current) {
      const subscription = strategy === 'modal'
        ? modalAnimation(ref.current)
        : rightSidebarAnimation(ref.current);

      // Animation cleanup
      return () => cancelAnimation(subscription);

    } else if (!isOpen && ref.current) {
      const subscription = strategy === 'modal'
        ? animate(ref.current, {
          scale: [1, 0.7],
          opacity: [1, 0],
          x: ['-50%', '-50%'],
          y: ['-50%', '-50%']
        }, {
          duration: 0.12,
        })
        : animate(ref.current, {
          scale: [1, 0.7],
          opacity: [1, 0]
        }, {
          duration: 0.12,
        });

      // Animation cleanup
      return () => cancelAnimation(subscription);
    }

  }, [isOpen, strategy]);

  return ref;
}


function modalAnimation(elm: HTMLElement) {
  return animate(elm, {
    scale: [0.7, 1],
    opacity: [0, 1],
    x: ['-50%', '-50%'],
    y: ['-50%', '-50%']
  }, {
    duration: 0.24, // seconds
  });
}

function rightSidebarAnimation(elm: HTMLElement) {
  return animate(elm, {
    opacity: [0, 1],
    x: ['0%', '-100%']
  }, {
    duration: 0.24, // seconds
  });
}

function cancelAnimation(animation: any) {
  if (typeof animation?.cancel === 'function') {
    animation.cancel();
  } else if (typeof animation?.stop === 'function') {
    animation.stop();
  }
}
