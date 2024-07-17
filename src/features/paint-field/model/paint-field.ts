import {
    ADDED_FILL,
    COST_FONT_STYLE,
    COST_TEXT_ALIGN,
    DEFAULT_FILL,
    END_FILL,
    FONT_FILL,
    OBSTACLE_FILL,
    PASSED_FILL,
    START_FILL,
    STROKE_STYLE,
} from './const.ts';
import { fieldItemModel } from '@/entities/field-item';

export const paintField = (canvas: HTMLCanvasElement, field: fieldItemModel.FieldItem[][]) => {
    const ctx = canvas.getContext('2d');

    ctx.reset();

    let x = 0;
    let y = 0;
    let maxHeight = 0;

    field.forEach((cols) => {
        maxHeight = 0;

        cols.forEach(({ width, height, isStart, isEnd, isObstacle, cost, isPassed = false, isAddedToPath = false }) => {
            ctx.fillStyle = isPassed ? PASSED_FILL : DEFAULT_FILL;
            ctx.fillRect(x, y, width, height);

            ctx.strokeStyle = STROKE_STYLE;
            ctx.strokeRect(x, y, width, height);

            if (isStart) {
                ctx.beginPath();
                ctx.fillStyle = START_FILL;
                ctx.arc(x + width / 2, y + height / 2, width / 4, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }

            if (isEnd) {
                ctx.beginPath();
                ctx.fillStyle = END_FILL;
                ctx.arc(x + width / 2, y + height / 2, width / 4, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }

            if (isObstacle) {
                ctx.beginPath();
                ctx.fillStyle = OBSTACLE_FILL;
                ctx.fillRect(x, y, width, height);
                ctx.closePath();
            }

            if (cost !== undefined) {
                const fontSize = height * 0.5;

                ctx.font = `${fontSize}px ${COST_FONT_STYLE}`;
                ctx.fillStyle = FONT_FILL;
                ctx.textAlign = COST_TEXT_ALIGN;
                ctx.fillText(cost.toString(), x + width / 2, y + height / 2 + fontSize / 2, width);
            }

            if (isAddedToPath) {
                ctx.beginPath();
                ctx.fillStyle = ADDED_FILL;
                ctx.arc(x + width / 2, y + height / 2, width / 10, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }

            x += width;

            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        x = 0;
        y += maxHeight;
    });
};
