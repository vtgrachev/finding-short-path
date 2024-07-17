import { MouseEvent } from 'react';

export interface FieldItem {
    id: string;
    width: number;
    height: number;
    isStart: boolean;
    isEnd: boolean;
    isObstacle?: boolean;
    isPassed?: boolean;
    isAddedToPath?: boolean;
    cost?: number;
}

export type ChangeFieldItem = (id: string, change: Partial<FieldItem>) => void;

export type GetTargetIndex = (
    event: MouseEvent<HTMLCanvasElement>,
    fieldSize: number,
) => { indexRow: number; indexCol: number };

export type DrawFieldWithAwait = (fieldItems: FieldItem[][]) => Promise<void>;
