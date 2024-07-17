import { useEffect, useRef } from 'react';
import { drawField } from './draw-field.ts';
import { fieldItemModel } from '@/entities/field-item';

export const useDrawField = (fieldItems: fieldItemModel.FieldItem[][]) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = ref.current;

        let frameId;

        if (canvas && fieldItems.length > 0) {
            frameId = requestAnimationFrame(() => drawField(canvas, fieldItems));
        }

        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId);
            }
        };
    }, [fieldItems]);

    const drawFieldWithAwait: fieldItemModel.DrawFieldWithAwait = (fieldItems) => {
        const canvas = ref.current;

        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                drawField(canvas!, fieldItems);
                setTimeout(() => {
                    resolve();
                }, 30);
            });
        });
    };

    return { ref, fieldItems, drawFieldWithAwait };
};
