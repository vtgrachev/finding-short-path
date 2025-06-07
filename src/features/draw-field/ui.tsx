import { forwardRef, MouseEvent } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './model/const.ts';

type Props = {
    onClick?: (event: MouseEvent<HTMLCanvasElement>) => void;
    onContextMenu?: (event: MouseEvent<HTMLCanvasElement>) => void;
};

export const FieldCanvas = forwardRef<HTMLCanvasElement, Props>(({ onClick, onContextMenu }, ref) => {
    const handleContextMenu = (event: MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();

        onContextMenu?.(event);
    };

    return (
        <canvas
            ref={ref}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={onClick}
            onContextMenu={handleContextMenu}
            className="border-2 box-border"
        />
    );
});
