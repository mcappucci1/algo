import { Algo, CellType, PathfindingAlgo, Speed } from './types';
import { getCoordinateFromId, getIdFromCoordinate, speedToMilliseconds, NUM_COLS, NUM_ROWS, PriorityQueue } from './common';

const MOVES = [[1,0], [0,1], [-1,0], [0,-1]];

export class Pathfinding {
    algo: Algo = PathfindingAlgo.A_STAR;
    speed: Speed = Speed.SLOW;
    start: string | undefined;
    stop = false;
    running = false;
    end: string | undefined;
    items: HTMLElement[][] = [[]];
    milliseconds: number = speedToMilliseconds(Speed.SLOW);
    timerId: NodeJS.Timer | undefined;
    alpha = 1;

    getStartandEnd() {
        this.start = undefined;
        this.end = undefined;
        for(let i = 0; i < NUM_ROWS; ++i) {
            for (let j = 0; j < NUM_COLS; ++j) {
                if (this.items[i][j].classList.contains(CellType.START)) {
                    this.start = getIdFromCoordinate({ x: i, y: j});
                } else if (this.items[i][j].classList.contains(CellType.TARGET)) {
                    this.end = getIdFromCoordinate({ x: i, y: j});
                }
            }
        }
    }

    findPath() {
        this.running = true;
        switch(this.algo as PathfindingAlgo) {
            case PathfindingAlgo.A_STAR: this.a_star(); break;
            case PathfindingAlgo.BREADTH_FIRST_SEARCH: this.breadthFirstSearch(); break;
            case PathfindingAlgo.DEPTH_FIRST_SEARCH: this.depthFirstSearch(); break;
            case PathfindingAlgo.BIDIRECTIONAL_SEARCH: this.bidirectionalSearch(); break;
            default: break;
        }
    }

    async a_star() {
        const seen = new Map<string, string>(), q = new PriorityQueue([[this.start!, 0, 0]]), endCoor = getCoordinateFromId(this.end!);
        let done = false;
        seen.set(this.start!, '');
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
                        await this.drawPath(path);
                        done = true;
                        break;
                    } else {
                        seen.set(nextId, curr[0]);
                        const distanceToTarget = this.alpha * Math.sqrt(Math.pow(endCoor.x - next.x, 2) + Math.pow(endCoor.y - next.y, 2));
                        const distanceFromStart = curr[1] + 1;
                        q.push([nextId, distanceFromStart, distanceToTarget]);
                    }
                }
            }
        }
        this.running = false;
    }

    async bidirectionalSearch() {
        const [seenStart, qStart] = [new Map<string, string>([[this.start!, '']]), [this.start!]];
        const [seenEnd, qEnd] = [new Map<string, string>([[this.end!, '']]), [this.end!]];
        let done = false;
        while ((qStart.length !== 0 || qEnd.length !== 0) && !done) {
            if (this.stop) {
                this.stop = false;
                this.resetBoard();
                return;
            }
            await this.sleep();
            const [currStart, currEnd] = [qStart.shift()!, qEnd.shift()!];
            const [coorStart, coorEnd] = [getCoordinateFromId(currStart), getCoordinateFromId(currEnd)];
            if (currStart !== this.start) this.items[coorStart.x][coorStart.y].classList.add(CellType.SEARCH_1);
            if (currEnd !== this.end) this.items[coorEnd.x][coorEnd.y].classList.add(CellType.SEARCH_2);
            if (seenEnd.has(currStart) || seenStart.has(currEnd)) {
                const [startPath, endPath]: [string[], string[]] = [[], []];
                let [start, end] = seenEnd.has(currStart) ? [currStart, seenEnd.get(currStart)!] : [seenStart.get(currEnd)!, currEnd];
                while (start !== this.start) {
                    startPath.unshift(start);
                    start = seenStart.get(start)!;
                }
                while (end !== this.end) {
                    endPath.push(end);
                    end = seenEnd.get(end)!;
                }
                await this.drawPath(startPath.concat(endPath));
                done = true;
                break;
            }
            for (let i = 0; i < MOVES.length; ++i) {
                const move = MOVES[i];
                const [nextStart, nextEnd] = [
                    {x: coorStart.x + move[0], y: coorStart.y + move[1]},
                    {x: coorEnd.x + move[0], y: coorEnd.y + move[1]}
                ];
                const [nextStartId, nextEndId] = [getIdFromCoordinate(nextStart), getIdFromCoordinate(nextEnd)];
                if (nextStart.x >= 0 && nextStart.x < NUM_ROWS && nextStart.y >= 0 && nextStart.y < NUM_COLS && !seenStart.has(nextStartId)) {
                    if (this.items[nextStart.x][nextStart.y].classList.contains(CellType.BLOCKED)) seenStart.set(nextStartId, '');
                    else {
                        seenStart.set(nextStartId, currStart);
                        qStart.push(nextStartId);
                    }
                }
                if (nextEnd.x >= 0 && nextEnd.x < NUM_ROWS && nextEnd.y >= 0 && nextEnd.y < NUM_COLS && !seenEnd.has(nextEndId)) {
                    if (this.items[nextEnd.x][nextEnd.y].classList.contains(CellType.BLOCKED)) seenEnd.set(nextEndId, '');
                    else {
                        seenEnd.set(nextEndId, currEnd);
                        qEnd.push(nextEndId);
                    }
                }
            }
        }
        this.running = false;
    }

    async firstSearch(get: (arr: string[]) => string) {
        const seen = new Map<string, string>(), q = [this.start!];
        let done = false;
        seen.set(this.start!, '');
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
                        await this.drawPath(path);
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

    async sleep(time?: number) {
        return new Promise(resolve => setTimeout(resolve, time || this.milliseconds));
    }

    async drawPath(path: string[]) {
        for (let i = path.length - 1; i >= 0; --i) {
            if (this.stop) break;
            await this.sleep(50);
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