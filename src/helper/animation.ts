import { animate } from 'popmotion';
import { Observable, Observer } from 'rxjs';


const scaleYStart = { opacity: 0, scaleY: 0.8 };
const scaleYEnd = { opacity: 1, scaleY: 1 };
const scaleXYStart = { opacity: 0, scale: 0.8 };
const scaleXYEnd = { opacity: 1, scale: 1 };


export const scaleY = () => animate$(scaleYStart, scaleYEnd);
export const scaleXY = () => animate$(scaleXYStart, scaleXYEnd);


function animate$(from: any, to: any) {
  return new Observable((obs: Observer<any>) => {

    const mainAction = animate({
      from, to,
      duration: 120,
      onUpdate: (v) => obs.next(v),
      onComplete: () => obs.complete()
    });

    return () => mainAction.stop();
  });
}
