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

export type Algo = SortAlgo | PathfindingAlgo;