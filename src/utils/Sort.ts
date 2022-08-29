import { Algo, SortAlgo, SortStage, Speed } from './types';
import { speedToMilliseconds } from './common';

export class Sort {
    algo: Algo = SortAlgo.INSERTION_SORT;
    speed: Speed = Speed.SLOW;
    items: HTMLElement[] = [];
    milliseconds: number = speedToMilliseconds(Speed.SLOW);
    timerId: NodeJS.Timer | undefined;
    running = false;
    run = false;
    stop = false;

    async sort() {
        if (this.running) return;
        this.run = true;
        this.running = true;
        switch(this.algo as SortAlgo) {
            case SortAlgo.BUBBLE_SORT: await this.bubbleSort(); break;
            case SortAlgo.INSERTION_SORT: await this.insertionSort(); break;
            case SortAlgo.SELECTION_SORT: await this.selectionSort(); break;
            case SortAlgo.MERGE_SORT: await this.mergeSort(this.items); break;
            default: break;
        }
        this.running = false;
        if (this.stop) {
            this.resetAppearance();
            this.stop = false;
        }
    }

    async bubbleSort() {
        let end = this.items.length, i = 0;
        while (end !== 0) {
            if (this.stop) return;
            await this.sleep();
            if (i === 1) --end;
            const prevIndex = i === 0 ? end % this.items.length : i-1, nextIndex = (i + 1) % (end+1);
            const prev = this.items[prevIndex], curr = this.items[i], next = this.items[nextIndex];
            if (curr.classList.contains(SortStage.TARGET)) curr.classList.remove(SortStage.TARGET);
            curr.classList.add(SortStage.ACTIVE);
            prev.classList.remove(SortStage.ACTIVE);
            if (nextIndex !== 0 && this.heightFromPercent(curr.style.height) > this.heightFromPercent(next.style.height)) {
                const height = curr.style.height;
                curr.style.height = next.style.height;
                next.style.height = height;
                next.classList.add(SortStage.TARGET);
            }
            i = nextIndex;
        }
        await this.endSortAnimation();
    }

    async insertionSort() {
        let i = 1, end = 1, last = 1;
        while (end !== this.items.length) {
            if (this.stop) return;
            await this.sleep();
            this.items[last].classList.remove(SortStage.ACTIVE);
            last = i;
            if (i === 0) i = ++end;
            const curr = this.items[i], left = this.items[--i];
            curr.classList.add(SortStage.ACTIVE);
            if (this.heightFromPercent(curr.style.height) < this.heightFromPercent(left.style.height)) {
                const store = left.style.height;
                left.style.height = curr.style.height;
                curr.style.height = store;
            } else i = ++end;
        }
        this.items[last].classList.remove(SortStage.ACTIVE);
        await this.endSortAnimation();
    }

    async selectionSort() {
        let i = 1, start = 0, min = this.items[0];
        min.classList.add(SortStage.TARGET);
        while (start < this.items.length) {
            if (this.stop) return;
            await this.sleep();
            const curr = this.items[i], prev = this.items[i-1 < start ? this.items.length-1 : i-1];
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
                if (i < this.items.length) {
                    min = this.items[i];
                    min.classList.add(SortStage.TARGET);
                }
            }
        }
        await this.endSortAnimation();
    }

    async sleep(time?: number) {
        return new Promise(resolve => setTimeout(resolve, time || this.milliseconds));
    }

    async mergeSort(items: HTMLElement[]): Promise<HTMLElement[]> {
        if (this.stop || items.length === 1) return items;
        const l = await this.mergeSort([...items].splice(0, Math.floor(items.length / 2))).then(arr => arr.map(e => this.heightFromPercent(e.style.height)));
        const r = await this.mergeSort([...items].splice(Math.floor(items.length / 2))).then(arr => arr.map(e => this.heightFromPercent(e.style.height)));
        let i = 0, j = 0;
        while (!(i === l.length && j === r.length)) {
            items[i+j].classList.add(SortStage.ACTIVE);
            items[i+j].style.height = ((j === r.length) || (!(i === l.length) && (l[i] < r[j]))) ? l[i++] + '%' : r[j++] + '%';
            if (this.stop) return [];
            await this.sleep();
            items[i+j-1].classList.remove(SortStage.ACTIVE);
        }
        if (items.length === this.items.length) await this.endSortAnimation();
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
            if (this.timerId != null) this.resetAppearance();
        }
    }

    setAlgo(algo: Algo) {
        if (algo !== this.algo) {
            this.algo = algo;
            if (this.timerId != null) this.resetAppearance();
        }
    }

    setItems(numItems: number) {
        this.items = [];
        for (let i = 0; i < numItems; ++i) this.items.push(document.getElementById(i.toString())!);
    }

    isSorted() {
        for (let i = 0; i < this.items.length-1; ++i) {
            const curr = this.items[i].style.height, next = this.items[i+1].style.height;
            if (this.heightFromPercent(curr) > this.heightFromPercent(next)) return false;
        }
        return this.heightFromPercent(this.items[0].style.height) < this.heightFromPercent(this.items[this.items.length-1].style.height);
    }

    async endSortAnimation() {
        let i = 0;
        while (i < this.items.length) {
            if (this.stop) return;
            await this.sleep(10);
            this.items[i++].classList.add(SortStage.SORTED);
        }
    }

    resetAppearance() {
        for (let i = 0; i < this.items.length; ++i)
            this.items[i].classList.remove(SortStage.ACTIVE, SortStage.SORTED, SortStage.TARGET);
        this.run = false;
    }

    stopExecution() {
        if (this.running) this.stop = true;
        else this.resetAppearance();
    }
}