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
    A_STAR = 'A* Search',
    BREADTH_FIRST_SEARCH = 'Breadth First Search',
    DEPTH_FIRST_SEARCH = 'Depth First Search',
    BIDIRECTIONAL_SEARCH = 'Bidirectional Search',
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
    TARGET = 'target-cell',
    SEARCH_1 = 'search-1-cell',
    SEARCH_2 = 'search-2-cell',
    SEARCH_3 = 'search-3-cell',
    PATH = 'path-cell'
}