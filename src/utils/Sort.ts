import { Algo, Speed } from './types';
import { speedToMilliseconds } from './common';

export class Sort {
    algo: Algo;
    speed: Speed;
    items: JSX.Element[];
    milliseconds: number;
    timerId: NodeJS.Timer | undefined;
    i: number = 0;

    constructor(algo: Algo, speed: Speed, items: JSX.Element[]) {
        this.algo = algo;
        this.speed = speed;
        this.items = items;
        this.milliseconds = speedToMilliseconds(speed);
    }

    sort() {
        this.timerId = setInterval(() => {
            document.getElementById(this.i.toString())!.style.backgroundColor = 'black';
            if (this.i != 0) document.getElementById((this.i-1).toString())!.style.backgroundColor = 'red';
            else {
                if (document.getElementById('49')!.style.backgroundColor === 'black') {
                    document.getElementById('49')!.style.backgroundColor = 'red';
                }
            }
            this.i = (this.i + 1) % 50;
        }, this.milliseconds);
    }

    clear() {
        if (this.timerId != null) {
            clearInterval(this.timerId);
            document.getElementById((this.i-1 === -1 ? 49 : this.i-1).toString())!.style.backgroundColor = 'red';
        }

    }
}