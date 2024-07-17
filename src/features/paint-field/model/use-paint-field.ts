import { useEffect, useRef } from 'react';
import { paintField } from './paint-field.ts';
import { fieldItemModel } from '@/entities/field-item';

export const usePaintField = (fieldItems: fieldItemModel.FieldItem[][]) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = ref.current;

        let idRequestAnimationFrame;

        if (canvas && fieldItems.length > 0) {
            idRequestAnimationFrame = requestAnimationFrame(() => paintField(canvas, fieldItems));
        }

        return () => {
            if (idRequestAnimationFrame) {
                cancelAnimationFrame(idRequestAnimationFrame);
            }
        };
    }, [fieldItems]);

    return { ref, fieldItems };
};
