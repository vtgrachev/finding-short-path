import { FieldItem } from './types.ts';
import { v4 as uuid } from 'uuid';

export const createFieldItems = (widthField: number, heightField: number, fieldSize: number): FieldItem[][] => {
    const width = Math.floor(widthField / fieldSize);
    const height = Math.floor(heightField / fieldSize);

    return Array(fieldSize)
        .fill(Array(fieldSize).fill(''))
        .map((row) => {
            return row.map(() => ({
                id: uuid(),
                width,
                height,
                isStart: false,
                isEnd: false,
            }));
        });
};
