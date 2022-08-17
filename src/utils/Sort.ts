import { Algo, SortAlgo, Speed } from './types';
import { speedToMilliseconds } from './common';

enum SortStage {
    ACTIVE = 'active-item',
    SORTED = 'sorted-item',
    TARGET = 'target-item'
}

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
            if (end === 0) this.endSortAnimation();
            if (this.i === 1) --end;
            const [prevIndex, nextIndex] = [this.i === 0 ? end % this.items.length : this.i-1, (this.i + 1) % (end+1)];
            const [prev, curr, next] = [this.items[prevIndex], this.items[this.i], this.items[nextIndex]];
            if (curr.classList.contains(SortStage.TARGET)) curr.classList.remove(SortStage.TARGET);
            curr.classList.add(SortStage.ACTIVE);
            prev.classList.remove(SortStage.ACTIVE);
            if (nextIndex != 0 && this.heightFromPercent(curr.style.height) > this.heightFromPercent(next.style.height)) {
                const height = curr.style.height;
                curr.style.height = next.style.height;
                next.style.height = height;
                next.classList.add(SortStage.TARGET);
            }
            this.i = nextIndex;
        }, this.milliseconds);
    }

    insertionSort() {
        let [i, start, min] = [1, 0, this.items[0]];
        min.classList.add(SortStage.TARGET);
        this.timerId = setInterval(() => {
            if (start === this.items.length) this.endSortAnimation();
            const [curr, prev] = [this.items[i], this.items[i-1 < start ? this.items.length-1 : i-1]];
            curr.classList.add(SortStage.ACTIVE);
            prev.classList.remove(SortStage.ACTIVE);
            if (this.heightFromPercent(curr.style.height) < this.heightFromPercent(min.style.height)) {
                min.classList.remove(SortStage.TARGET);
                min = curr;
                min.classList.add(SortStage.TARGET);
            }
            i += 1;
            if (i === this.items.length) {
                min.classList.remove(SortStage.TARGET);
                const height = this.items[start].style.height;
                this.items[start].style.height = min.style.height;
                min.style.height = height;
                i = ++start;
                min = this.items[i];
                min.classList.add(SortStage.TARGET);
            }
        }, this.milliseconds);
    }

    isSorted() {
        for (let i = 0; i < this.items.length-1; ++i) {
            const [curr, next] = [this.items[i].style.height, this.items[i+1].style.height];
            if (this.heightFromPercent(curr) > this.heightFromPercent(next)) return false;
        }
        return this.heightFromPercent(this.items[0].style.height) < this.heightFromPercent(this.items[this.items.length-1].style.height);
    }

    endSortAnimation() {
        this.clear();
        let i = 0;
        if (this.items[this.i].classList.contains(SortStage.ACTIVE)) this.items[this.i].classList.remove(SortStage.ACTIVE);
        this.timerId = setInterval(() => {
            if (i === this.items.length) {
                this.clear();
                return;
            }
            this.items[i].classList.add(SortStage.SORTED);
            ++i;
        }, 20);
    }

    clear() {
        if (this.timerId != null) clearInterval(this.timerId);
    }
}