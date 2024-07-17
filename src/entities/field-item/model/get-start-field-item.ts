import { FieldItem } from './types.ts';

export const getStartFieldItem = (fieldItems: FieldItem[][]) => {
    for (const indexRow in fieldItems) {
        for (const indexCol in fieldItems[indexRow]) {
            if (fieldItems[indexRow][indexCol].isStart) {
                return fieldItems[indexRow][indexCol];
            }
        }
    }

    return undefined;
};
