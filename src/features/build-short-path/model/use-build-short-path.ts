import { fieldItemModel } from '@/entities/field-item';
import { bfs } from './bfs.ts';
import { dfs } from './dfs.ts';
import { dijkstra } from './dijkstra.ts';
import { aStar } from './a-star.ts';

export const useBuildShortPath = (
    fieldItems: fieldItemModel.FieldItem[][],
    changeFieldItem: fieldItemModel.ChangeFieldItem,
) => {
    const buildShortPath = (algorithm: string) => {
        fieldItems.forEach((cols) => {
            cols.forEach((item) => {
                changeFieldItem(item.id, { isPassed: false, isAddedToPath: false });
            });
        });

        if (!fieldItems?.some((col) => col.some(({ isStart }) => isStart))) {
            alert('Не задана точка начала.');
            return;
        }

        if (!fieldItems?.some((col) => col.some(({ isEnd }) => isEnd))) {
            alert('Не задана точка цели.');
            return;
        }

        if (algorithm === 'bfs') {
            bfs(fieldItems, changeFieldItem);
        } else if (algorithm === 'dfs') {
            dfs(fieldItems, changeFieldItem);
        } else if (algorithm === 'dijkstra') {
            dijkstra(fieldItems, changeFieldItem);
        } else if (algorithm === 'a-star') {
            aStar(fieldItems, changeFieldItem);
        }
    };

    return { buildShortPath };
};
