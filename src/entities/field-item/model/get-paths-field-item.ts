import { FieldItem } from './types.ts';

export const getPathsFieldItem = (fieldItems: FieldItem[][], startItem: FieldItem): FieldItem[] | undefined => {
    for (const indexRow in fieldItems) {
        for (const indexCol in fieldItems[indexRow]) {
            if (fieldItems[indexRow][indexCol].id === startItem.id) {
                return [
                    fieldItems?.[Number(indexRow)]?.[Number(indexCol) + 1],
                    fieldItems?.[Number(indexRow) + 1]?.[Number(indexCol)],
                    fieldItems?.[Number(indexRow)]?.[Number(indexCol) - 1],
                    fieldItems?.[Number(indexRow) - 1]?.[Number(indexCol)],
                ].filter((path) => path !== undefined && !path.isObstacle);
            }
        }
    }

    return undefined;
};
