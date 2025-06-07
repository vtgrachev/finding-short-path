import { useCallback, useRef } from 'react';
import { drawField } from './draw-field.ts';
import { fieldItemModel } from '@/entities/field-item';

export const useDrawField = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const drawFieldWithAwait: fieldItemModel.DrawFieldWithAwait = useCallback((fieldItems) => {
        const canvas = ref.current;

        return new Promise((resolve) => {
            const start = performance.now();

            const draw = (time: DOMHighResTimeStamp) => {
                if (time - start >= 30) {
                    drawField(canvas!, fieldItems);
                    resolve();
                } else {
                    requestAnimationFrame(draw);
                }
            };

            requestAnimationFrame(draw);
        });
    }, []);

    return { ref, drawFieldWithAwait };
};
