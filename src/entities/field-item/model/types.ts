import { MouseEvent } from 'react';

export interface FieldItem {
    id: string;
    width: number;
    height: number;
    isStart: boolean;
    isEnd: boolean;
    isObstacle?: boolean;
    cost?: number;
}

export type ChangeFieldItem = (indexRow: number, indexCol: number, change: Partial<FieldItem>) => void;

export type GetTargetIndex = (
    event: MouseEvent<HTMLCanvasElement>,
    fieldSize: number,
) => { indexRow: number; indexCol: number };
