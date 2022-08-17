export enum Speed {
    SLOW = 'Slow',
    MEDIUM = 'Medium',
    FAST = 'Fast',
    SUPER_FAST = 'Super Fast'
}

export enum SortAlgo {
    BUBBLE_SORT = 'Bubble Sort',
    INSERTION_SORT = 'Insertion Sort',
    MERGE_SORT = 'Merge Sort'
}

export enum PathfindingAlgo {
    DIJKSTRAS = 'Djickstra\'s'
}

export type Algo = SortAlgo | PathfindingAlgo;