import { Algo, SortAlgo, Speed } from './types';
import { speedToMilliseconds } from './common';

export class Sort {
    algo: Algo;
    speed: Speed;
    items: HTMLElement[];
    milliseconds: number;
    timerId: NodeJS.Timer | undefined;
    i: number = 0;

    constructor(algo: Algo, speed: Speed, items: JSX.Element[]) {
        this.algo = algo;
        this.speed = speed;
        this.items = [];
        for (let i = 0; i < items.length; ++i) this.items.push(document.getElementById(i.toString())!);
        this.milliseconds = speedToMilliseconds(speed);
    }

    sort() {
        switch(this.algo as SortAlgo) {
            case SortAlgo.BUBBLE_SORT:
                this.bubbleSort();
                break;
            case SortAlgo.INSERTION_SORT:
                this.insertionSort();
                break;
            default:
                break;
        }
    }

    heightFromPercent(percent: string): number {
        return parseFloat(percent.slice(0, -1));
    }

    bubbleSort() {
        let end = this.items.length;
        this.timerId = setInterval(() => {
            if (this.isSorted()) this.endSortAnimation();
            if (this.i === 1) --end;
            const [prevIndex, nextIndex] = [this.i === 0 ? end % this.items.length : this.i-1, (this.i + 1) % (end+1)];
            const [prev, curr, next] = [this.items[prevIndex], this.items[this.i], this.items[nextIndex]];
            curr.style.backgroundColor = 'black';
            prev.style.backgroundColor = 'red';
            if (nextIndex != 0 && this.heightFromPercent(curr.style.height) > this.heightFromPercent(next.style.height)) {
                const height = curr.style.height;
                curr.style.height = next.style.height;
                next.style.height = height;
            }
            this.i = nextIndex;
        }, this.milliseconds);
    }

    insertionSort() {
        let [i, start, min] = [1, 0, this.items[0]];
        let counter = 0;
        this.timerId = setInterval(() => {
            ++counter;
            if (this.isSorted()) this.endSortAnimation();
            const curr = this.items[i];
            const prev = this.items[i-1 < start ? this.items.length-1 : i-1];
            curr.style.backgroundColor = 'black';
            prev.style.backgroundColor = 'red';
            if (this.heightFromPercent(curr.style.height) < this.heightFromPercent(min.style.height)) min = curr;
            i += 1;
            if (i === this.items.length) {
                const height = this.items[start].style.height;
                this.items[start].style.height = min.style.height;
                min.style.height = height;
                if (parseFloat(min.id) < start) {
                    console.log('broken');
                }
                i = ++start;
                min = this.items[i];
            }
            --counter;
        }, this.milliseconds);
    }

    isSorted() {
        for (let i = 0; i < this.items.length-1; ++i) {
            const curr = this.items[i].style.height;
            const next = this.items[i+1].style.height
            if (this.heightFromPercent(curr) > this.heightFromPercent(next)) {
                return false;
            }
        }
        return this.heightFromPercent(this.items[0].style.height) < this.heightFromPercent(this.items[this.items.length-1].style.height);
    }

    endSortAnimation() {
        this.clear();
        let i = 0;
        if (this.items[this.i].style.backgroundColor === 'black') this.items[this.i].style.backgroundColor = 'red';
        this.timerId = setInterval(() => {
            if (i === this.items.length) this.clear();
            else {
                this.items[i].style.backgroundColor = 'green';
                ++i;
            }
        }, 20);
    }

    clear() {
        if (this.timerId != null) clearInterval(this.timerId);
    }
}