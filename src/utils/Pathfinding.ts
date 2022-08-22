import { Algo, CellType, PathfindingAlgo, Speed } from './types';
import { getCoordinateFromId, getIdFromCoordinate, speedToMilliseconds, NUM_COLS, NUM_ROWS, PriorityQueue } from './common';

const MOVES = [[1,0], [0,1], [-1,0], [0,-1]];

export class Pathfinding {
    algo: Algo = PathfindingAlgo.A_STAR;
    speed: Speed = Speed.SLOW;
    start: string = '';
    stop = false;
    running = false;
    end: string = '';
    items: HTMLElement[][] = [[]];
    milliseconds: number = speedToMilliseconds(Speed.SLOW);
    timerId: NodeJS.Timer | undefined;

    findPath() {
        this.running = true;
        for(let i = 0; i < NUM_ROWS; ++i) {
            for (let j = 0; j < NUM_COLS; ++j) {
                if (this.items[i][j].classList.contains(CellType.START)) {
                    this.start = getIdFromCoordinate({ x: i, y: j});
                } else if (this.items[i][j].classList.contains(CellType.TARGET)) {
                    this.end = getIdFromCoordinate({ x: i, y: j});
                }
            }
        }
        switch(this.algo as PathfindingAlgo) {
            case PathfindingAlgo.A_STAR: this.a_start(); break;
            case PathfindingAlgo.BREADTH_FIRST_SEARCH: this.breadthFirstSearch(); break;
            case PathfindingAlgo.DEPTH_FIRST_SEARCH: this.depthFirstSearch(); break;
            default: break;
        }
    }

    async a_start() {
        const seen = new Map<string, string>(), q = new PriorityQueue([[this.start, 0, 0]]), startCoor = getCoordinateFromId(this.start), endCoor = getCoordinateFromId(this.end);
        let done = false;
        seen.set(this.start, '');
        while (q.length !== 0 && !done) {
            if (this.stop) {
                this.stop = false;
                this.resetBoard();
                return;
            }
            await this.sleep();
            const curr = q.pop()!;
            const coor = getCoordinateFromId(curr[0]);
            if (curr[0] !== this.start) this.items[coor.x][coor.y].classList.add(CellType.SEARCH_1);
            for (let i = 0; i < MOVES.length; ++i) {
                const move = MOVES[i], next = { x: coor.x + move[0], y: coor.y + move[1] }, nextId = getIdFromCoordinate(next);
                if (next.x >= 0 && next.x < this.items.length && next.y >= 0 && next.y < this.items[0].length && !seen.has(nextId)) {
                    if (this.items[next.x][next.y].classList.contains(CellType.BLOCKED)) seen.set(nextId, '');
                    else if (this.items[next.x][next.y].classList.contains(CellType.TARGET)) {
                        let path = [], coorStr = curr[0];
                        while (coorStr !== this.start) {
                            path.push(coorStr);
                            coorStr = seen.get(coorStr)!;
                        }
                        this.drawPath(path);
                        done = true;
                        break;
                    } else {
                        seen.set(nextId, curr[0]);
                        const distanceToTarget = Math.sqrt(Math.pow(endCoor.x - next.x, 2) + Math.pow(endCoor.y - next.y, 2));
                        const distanceFromStart = curr[1] + 1;
                        q.push([nextId, distanceFromStart, distanceToTarget]);
                    }
                }
            }
        }
        this.running = false;
    }

    async firstSearch(get: (arr: string[]) => string) {
        const seen = new Map<string, string>(), q = [this.start];
        let done = false;
        seen.set(this.start, '');
        while (q.length !== 0 && !done) {
            if (this.stop) {
                this.stop = false;
                this.resetBoard();
                return;
            }
            await this.sleep();
            const coorStr = get(q), coor = getCoordinateFromId(coorStr);
            if (coorStr !== this.start) this.items[coor.x][coor.y].classList.add(CellType.SEARCH_1);
            for (let i = 0; i < MOVES.length; ++i) {
                const move = MOVES[i], next = { x: coor.x + move[0], y: coor.y + move[1] }, nextId = getIdFromCoordinate(next);
                if (next.x >= 0 && next.x < this.items.length && next.y >= 0 && next.y < this.items[0].length && !seen.has(nextId)) {
                    if (this.items[next.x][next.y].classList.contains(CellType.BLOCKED)) seen.set(nextId, '');
                    else if (this.items[next.x][next.y].classList.contains(CellType.TARGET)) {
                        let path = [], curr = coorStr;
                        while (curr !== this.start) {
                            path.push(curr);
                            curr = seen.get(curr)!;
                        }
                        this.drawPath(path);
                        done = true;
                        break;
                    } else {
                        seen.set(nextId, coorStr);
                        q.push(nextId);
                    }
                }
            }
        }
    }

    async breadthFirstSearch() {
        await this.firstSearch((arr: string[]) => arr.shift()!);
        this.running = false;
    }

    async depthFirstSearch() {
        await this.firstSearch((arr: string[]) => arr.pop()!);
        this.running = false;
    }

    async sleep() {
        return new Promise(resolve => setTimeout(resolve, this.milliseconds));
    }

    drawPath(path: string[]) {
        for (let i = path.length - 1; i >= 0; --i) {
            const coor = getCoordinateFromId(path[i]);
            this.items[coor.x][coor.y].classList.add(CellType.PATH);
        }
    }

    setAll(algo: Algo, speed: Speed) {
        this.setSpeed(speed);
        this.setAlgo(algo);
        this.setItems();
    }

    setSpeed(speed: Speed) {
        if (speed !== this.speed) {
            this.milliseconds = speedToMilliseconds(speed);
            this.speed = speed;
        }
    }

    setAlgo(algo: Algo) {
        if (algo !== this.algo) {
            this.algo = algo;
        }
    }

    setItems() {
        const items: HTMLElement[][] = [];
        for(let i = 0; i < NUM_ROWS; ++i) {
            items.push([]);
            for (let j = 0; j < NUM_COLS; ++j) {
                items[i].push(document.getElementById(getIdFromCoordinate({x: i, y: j}))!);
            }
        }
        this.items = items;
    }

    resetBoard() {
        if (this.items.length <= 1) return;
        const classes = Object.values(CellType);
        for(let i = 0; i < NUM_ROWS; ++i) {
            for (let j = 0; j < NUM_COLS; ++j) {
                const cell = this.items[i][j].classList;
                classes.forEach(c => { if (cell.contains(c)) cell.remove(c); });
            }
        }
    }

    stopExecution() {
        if (this.running) this.stop = true;
        else this.resetBoard();
    }
}