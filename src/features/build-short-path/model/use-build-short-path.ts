import { fieldItemModel } from '@/entities/field-item';
import { bfs } from './bfs.ts';
import { dfs } from './dfs.ts';
import { dijkstra } from './dijkstra.ts';
import { aStar } from './a-star.ts';
import { useState } from 'react';

export const useBuildShortPath = (
    fieldItems: fieldItemModel.FieldItem[][],
    drawFieldWithAwait: fieldItemModel.DrawFieldWithAwait,
) => {
    const [isDrawAlgorithm, setDrawAlgorithm] = useState(false);

    const buildShortPath = async (algorithm: string) => {
        if (!fieldItems?.some((col) => col.some(({ isStart }) => isStart))) {
            alert('Не задана точка начала.');
            return;
        }

        if (!fieldItems?.some((col) => col.some(({ isEnd }) => isEnd))) {
            alert('Не задана точка цели.');
            return;
        }

        let renderingSteps: fieldItemModel.FieldItem[][][] | null = null;

        if (algorithm === 'bfs') {
            renderingSteps = bfs(fieldItems);
        } else if (algorithm === 'dfs') {
            renderingSteps = dfs(fieldItems);
        } else if (algorithm === 'dijkstra') {
            renderingSteps = dijkstra(fieldItems);
        } else if (algorithm === 'a-star') {
            renderingSteps = aStar(fieldItems);
        }

        if (renderingSteps !== null) {
            setDrawAlgorithm(true);

            for (const step of renderingSteps) {
                await drawFieldWithAwait(step);
            }

            setDrawAlgorithm(false);
        }
    };

    return { buildShortPath, isDrawAlgorithm };
};
