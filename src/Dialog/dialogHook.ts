import { useRef, useLayoutEffect, Ref } from 'preact/hooks';
import { animate } from 'popmotion';
import styler from 'stylefire';


export type DialogStrategy = 'modal' | 'sidebar-right';


export function useDialog(isOpen: boolean, strategy: DialogStrategy) {

  const ref: Ref<any> = useRef<HTMLElement>(null);


  useLayoutEffect(() => {

    if (isOpen && ref.current) {

      const elmStyler = styler(ref.current);

      const updater = (v: any) => elmStyler.set(v);

      const subscription = strategy === 'modal'
        ? modalAnimation(updater)
        : rightSidebarAnimation(updater);

      // Animation cleanup
      return () => subscription.stop();

    } else if (!isOpen && ref.current) {

      const elmStyler = styler(ref.current);

      const subscription = animate({
        to: {
          scale: 0.7,
          opacity: 0
        },
        onUpdate: (v: any) => elmStyler.set(v)
      });

      // Animation cleanup
      return () => subscription.stop();
    }

  }, [isOpen, strategy]);

  return ref;
}


function modalAnimation(updater: (v: any) => void) {
  return animate({
    duration: 240,
    from: {
      scale: 0.7,
      opacity: 0,
      x: '-50%',
      y: '-50%'
    },
    to: {
      scale: 1,
      opacity: 1,
      x: '-50%',
      y: '-50%'
    },
    onUpdate: updater
  });
}

function rightSidebarAnimation(updater: (v: any) => void) {
  return animate({
    duration: 240,
    from: {
      opacity: 0,
      x: '0%'
    },
    to: {
      opacity: 1,
      x: '-100%'
    },
    onUpdate: updater
  });
}
