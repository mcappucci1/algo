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
    return { x: parseInt(nums[0]), y: parseInt(nums[1]) };
}