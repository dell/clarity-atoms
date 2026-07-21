
import { animate } from 'motion';
import { Observable, Observer } from 'rxjs';


const scaleYStart = { opacity: 0, scaleY: 0.8 };
const scaleYEnd = { opacity: 1, scaleY: 1 };
const scaleXYStart = { opacity: 0, scale: 0.8 };
const scaleXYEnd = { opacity: 1, scale: 1 };


export const scaleY = () => animate$(scaleYStart, scaleYEnd);
export const scaleXY = () => animate$(scaleXYStart, scaleXYEnd);


function animate$(from: any, to: any) {
  return new Observable((obs: Observer<any>) => {

    const keys = Object.keys(to || {});

    const mainAction = animate(0, 1, {
      duration: 0.12, // seconds
      onUpdate: (progress) => {
        const frame = keys.reduce((acc, key) => {
          const fromValue = from?.[key];
          const toValue = to?.[key];

          if (typeof fromValue === 'number' && typeof toValue === 'number') {
            acc[key] = fromValue + (toValue - fromValue) * progress;
          } else {
            acc[key] = progress < 1 ? fromValue : toValue;
          }

          return acc;
        }, {} as Record<string, any>);

        obs.next(frame);
      },
      onComplete: () => obs.complete(),
    });

    return () => {
      if (typeof (mainAction as any).cancel === 'function') {
        (mainAction as any).cancel();
      } else if (typeof (mainAction as any).stop === 'function') {
        (mainAction as any).stop();
      }
    };
  });
}
