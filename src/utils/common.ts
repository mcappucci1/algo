import { Cell, Speed } from './types';

export const NUM_ITEMS = 100;
export const NUM_COLS = 50;
export const NUM_ROWS = 30;

export const speedToMilliseconds = (speed: Speed): number => {
    switch(speed) {
        case Speed.SLOW: return 500;
        case Speed.MEDIUM: return 100;
        case Speed.FAST: return 10;
        case Speed.SUPER_FAST: return 1;
    }
}

export const shuffleArray = (array: number[]): void => {
    for (let i = 0; i < array.length; ++i) {
        const j = Math.floor(Math.random() * array.length);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export const getIdFromCoordinate = (coor: Cell): string => `${coor.x}-${coor.y}`;

export const getCoordinateFromId = (id: string): Cell => {
    const nums = id.split('-');
    console.log(nums);
    return { x: parseInt(nums[0]), y: parseInt(nums[1]) };
}

export class PriorityQueue {
    arr: [string, number, number][] = [];
    length: number = 0;

    constructor(start: [string, number, number][]) {
        start.forEach((e) => this.push(e));
    }

    push(e: [string, number, number]): void {
        if (this.length === 0) this.arr.push(e);
        let l = 0, r = this.arr.length - 1, m = -1;
        while (l <= r) {
            m = Math.floor((l + r) / 2);
            if ((e[1] + e[2]) < (this.arr[m][1] + this.arr[m][2])) r = m-1;
            else if (e[1] > this.arr[m][1]) l = m+1;
            else break;
        }
        this.arr.splice(m, 0, e);
        this.length = this.arr.length;
    }

    pop(): [string, number, number] | undefined {
        const val = this.arr.shift();
        this.length = this.arr.length;
        return val;
    }
}