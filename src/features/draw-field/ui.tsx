import { forwardRef, MouseEvent } from 'react';

type Props = {
    width?: number;
    height?: number;
    onClick?: (event: MouseEvent<HTMLCanvasElement>) => void;
    onContextMenu?: (event: MouseEvent<HTMLCanvasElement>) => void;
};

export const FieldCanvas = forwardRef<HTMLCanvasElement, Props>(({ width, height, onClick, onContextMenu }, ref) => {
    const handleContextMenu = (event: MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();

        onContextMenu?.(event);
    };

    return (
        <canvas
            ref={ref}
            onClick={onClick}
            onContextMenu={handleContextMenu}
            width={width === 0 ? undefined : width}
            height={height === 0 ? undefined : height}
            className="border-2 box-border w-full max-w-[500px] max-h-[500px]"
        />
    );
});
