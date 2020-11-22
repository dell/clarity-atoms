import { animate } from 'popmotion';
import { Observable, Observer } from 'rxjs';


export function scaleY() {

  return new Observable((obs: Observer<any>) => {

    const mainAction = animate({
      from: { opacity: 0, scaleY: 0.8 },
      to: { opacity: 1, scaleY: 1 },
      duration: 200,
      onUpdate: (v) => obs.next(v),
      onComplete: () => {
        obs.complete();
      }
    });

    return () => mainAction.stop();

  });

}
