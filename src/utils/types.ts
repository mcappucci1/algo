export enum Speed {
    SLOW = 'Slow',
    MEDIUM = 'Medium',
    FAST = 'Fast',
    SUPER_FAST = 'Super Fast'
}

export enum SortAlgo {
    BUBBLE_SORT = 'Bubble Sort',
    INSERTION_SORT = 'Insertion Sort',
    SELECTION_SORT = 'Selection Sort',
    MERGE_SORT = 'Merge Sort'
}

export enum PathfindingAlgo {
    DIJKSTRAS = 'Djickstra\'s'
}

export type Cell = {
    x: number,
    y: number
}

export type Algo = SortAlgo | PathfindingAlgo;

export enum SortStage {
    ACTIVE = 'active-item',
    SORTED = 'sorted-item',
    TARGET = 'target-item'
}

export enum CellType {
    BLOCKED = 'blocked-cell',
    START = 'start-cell',
    TARGET = 'target-cell'
}