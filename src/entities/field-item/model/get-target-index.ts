import { GetTargetIndex } from './types.ts';

export const getTargetIndex: GetTargetIndex = (event, fieldSize: number) => {
    const { x: xCanvas, y: yCanvas } = event.currentTarget.getBoundingClientRect();

    const widthTarget = event.currentTarget.width / fieldSize;
    const heightTarget = event.currentTarget.height / fieldSize;

    const xTarget = event.clientX - xCanvas;
    const yTarget = event.clientY - yCanvas;

    return {
        indexRow: Math.floor(yTarget / heightTarget),
        indexCol: Math.floor(xTarget / widthTarget),
    };
};
