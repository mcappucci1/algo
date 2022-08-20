import { Algo, SortAlgo, Speed } from './types';
import { speedToMilliseconds } from './common';

enum SortStage {
    ACTIVE = 'active-item',
    SORTED = 'sorted-item',
    TARGET = 'target-item'
}

export class Sort {
    algo: Algo = SortAlgo.INSERTION_SORT;
    speed: Speed = Speed.SLOW;
    items: HTMLElement[] = [];
    milliseconds: number = speedToMilliseconds(Speed.SLOW);
    timerId: NodeJS.Timer | undefined;
    i = 0;

    sort() {
        switch(this.algo as SortAlgo) {
            case SortAlgo.BUBBLE_SORT: this.bubbleSort(); break;
            case SortAlgo.INSERTION_SORT: this.insertionSort(); break;
            case SortAlgo.MERGE_SORT: this.asyncMerge([...this.items]); break;
            default: break;
        }
    }

    bubbleSort() {
        let [end, i] = [this.items.length, 0];
        this.timerId = setInterval(() => {
            if (end === 0) this.endSortAnimation();
            if (i === 1) --end;
            const [prevIndex, nextIndex] = [i === 0 ? end % this.items.length : i-1, (i + 1) % (end+1)];
            const [prev, curr, next] = [this.items[prevIndex], this.items[i], this.items[nextIndex]];
            if (curr.classList.contains(SortStage.TARGET)) curr.classList.remove(SortStage.TARGET);
            curr.classList.add(SortStage.ACTIVE);
            prev.classList.remove(SortStage.ACTIVE);
            if (nextIndex != 0 && this.heightFromPercent(curr.style.height) > this.heightFromPercent(next.style.height)) {
                const height = curr.style.height;
                curr.style.height = next.style.height;
                next.style.height = height;
                next.classList.add(SortStage.TARGET);
            }
            i = nextIndex;
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

    async sleep() {
        return new Promise(resolve => setTimeout(resolve, this.milliseconds));
    }

    async asyncMerge(items: HTMLElement[]): Promise<HTMLElement[]> {
        if (items.length === 1) return items;
        const l = await this.asyncMerge([...items].splice(0, Math.floor(items.length / 2))).then(arr => arr.map(e => this.heightFromPercent(e.style.height)));
        const r = await this.asyncMerge([...items].splice(Math.floor(items.length / 2))).then(arr => arr.map(e => this.heightFromPercent(e.style.height)));
        let [i, j] = [0, 0];
        while (!(i === l.length && j === r.length)) {
            items[i+j].style.height = ((j === r.length) || (!(i === l.length) && (l[i] < r[j]))) ? l[i++] + '%' : r[j++] + '%';
            await this.sleep();
        }
        return items;
    }

    mergeSort() {
        this.recMergeSort(this.items);
    }

    recMergeSort(items: HTMLElement[]): HTMLElement[] {
        if (items.length === 1) return items;
        const [l, r] = [
            this.recMergeSort([...items].splice(0, Math.floor(items.length / 2))).map(e => this.heightFromPercent(e.style.height)),
            this.recMergeSort([...items].splice(Math.floor(items.length / 2))).map(e => this.heightFromPercent(e.style.height))
        ];
        let [i, j] = [0, 0];
        while (!(i === l.length && j === r.length))
            items[i+j].style.height = ((j === r.length) || (!(i === l.length) && (l[i] < r[j]))) ? l[i++] + '%' : r[j++] + '%';
        return items;
    }

    heightFromPercent(percent: string): number {
        return parseFloat(percent.slice(0, -1));
    }

    setAll(algo: Algo, speed: Speed, numItems: number) {
        this.setSpeed(speed);
        this.setAlgo(algo);
        this.setItems(numItems);
    }

    setSpeed(speed: Speed) {
        if (speed !== this.speed) {
            this.milliseconds = speedToMilliseconds(speed);
            this.speed = speed;
            if (this.timerId != null) {
                this.clear();
                this.resetAppearance();
            }
        }
    }

    setAlgo(algo: Algo) {
        if (algo !== this.algo) {
            this.algo = algo;
            if (this.timerId != null) {
                this.clear();
                this.resetAppearance();
            }
        }
    }

    setItems(numItems: number) {
        this.items = [];
        for (let i = 0; i < numItems; ++i) this.items.push(document.getElementById(i.toString())!);
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
        this.timerId = setInterval(() => {
            if (i === this.items.length) this.clear();
            else this.items[i++].classList.add(SortStage.SORTED);
        }, 10);
    }

    resetAppearance() {
        for (let i = 0; i < this.items.length; ++i)
            this.items[i].classList.remove(SortStage.ACTIVE, SortStage.SORTED, SortStage.TARGET);
    }

    clear() {
        if (this.timerId != null) clearInterval(this.timerId);
    }
}