import { FieldItem } from './types.ts';

export const getEndFieldItem = (fieldItems: FieldItem[][]) => {
    for (const indexRow in fieldItems) {
        for (const indexCol in fieldItems[indexRow]) {
            if (fieldItems[indexRow][indexCol].isEnd) {
                return fieldItems[indexRow][indexCol];
            }
        }
    }

    return undefined;
};
