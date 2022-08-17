import { Speed } from './types';

export const speedToMilliseconds = (speed: Speed): number => {
    switch(speed) {
        case Speed.SLOW: return 200;
        case Speed.MEDIUM: return 50;
        case Speed.FAST: return 10;
        case Speed.SUPER_FAST: return 1;
    }
}