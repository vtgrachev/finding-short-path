import { fieldItemModel } from '@/entities/field-item';
import { getPath } from './get-path.ts';

const l1 = (begin: { x: number; y: number }, end: { x: number; y: number }) => {
    return Math.abs(begin.x - end.x) + Math.abs(begin.y - end.y);
};

const getCordsFieldItem = (fieldItems: fieldItemModel.FieldItem[][], target: fieldItemModel.FieldItem) => {
    for (const y in fieldItems) {
        for (const x in fieldItems[y]) {
            if (fieldItems[y][x].id === target.id) {
                return { x: Number(x), y: Number(y) };
            }
        }
    }

    return { x: 0, y: 0 };
};

export const aStar = (fieldItems: fieldItemModel.FieldItem[][]) => {
    const renderingSteps = [fieldItems];

    const startItem = fieldItemModel.getStartFieldItem(fieldItems);

    const endItem = fieldItemModel.getEndFieldItem(fieldItems);

    if (startItem == null || endItem == null) {
        return [];
    }

    const cordsEndItem = getCordsFieldItem(fieldItems, endItem);

    const queue = [startItem];

    const passed = new Set([startItem.id]);

    const pathToEnd: Record<string, string | null> = {
        [startItem.id]: null,
    };

    const costItems = new Map([[startItem.id, startItem.cost ?? 0]]);

    const lastStep = renderingSteps[renderingSteps.length - 1];

    renderingSteps.push(
        lastStep.map((cols) =>
            cols.map((item) => {
                if (item.id === startItem.id) {
                    return {
                        ...item,
                        isPassed: true,
                    };
                }

                return { ...item };
            }),
        ),
    );

    while (queue.length > 0) {
        const currentFieldItem = queue.shift();

        if (currentFieldItem == null) {
            break;
        }

        if (currentFieldItem.id === endItem.id) {
            break;
        }

        const nextItems = (fieldItemModel.getPathsFieldItem(fieldItems, currentFieldItem) ?? []).filter(
            ({ id }) => !passed.has(id),
        );

        nextItems.forEach((item) => {
            if (!costItems.has(item.id)) {
                costItems.set(item.id, Infinity);

                pathToEnd[item.id] = currentFieldItem.id;
            }

            const lastCost = costItems.get(item.id) ?? Infinity;

            const nextCost =
                (item.cost ?? 0) + (currentFieldItem.cost ?? 0) + l1(getCordsFieldItem(fieldItems, item), cordsEndItem);

            if (lastCost > nextCost) {
                costItems.set(item.id, nextCost);
            }
        });

        let nextItem: fieldItemModel.FieldItem | null = null;

        Array.from(costItems.entries()).forEach(([id, cost]) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!passed.has(id) && cost < (costItems.get(nextItem?.id) ?? Infinity)) {
                for (const cols of fieldItems) {
                    let isFind = false;

                    for (const item of cols) {
                        if (item.id === id) {
                            nextItem = item;

                            isFind = true;

                            break;
                        }
                    }

                    if (isFind) {
                        break;
                    }
                }
            }
        });

        if (nextItem) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            passed.add(nextItem.id);

            const lastStep = renderingSteps[renderingSteps.length - 1];

            renderingSteps.push(
                lastStep.map((cols) =>
                    cols.map((item) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        if (item.id === nextItem.id) {
                            return {
                                ...item,
                                isPassed: true,
                            };
                        }

                        return { ...item };
                    }),
                ),
            );

            queue.push(nextItem);
        }
    }

    const path = getPath(pathToEnd, endItem.id);

    path.filter((idPath) => idPath !== startItem.id && idPath !== endItem.id).forEach((idPath) => {
        const lastStep = renderingSteps[renderingSteps.length - 1];

        renderingSteps.push(
            lastStep.map((cols) =>
                cols.map((item) => {
                    if (item.id === idPath) {
                        return {
                            ...item,
                            isAddedToPath: true,
                        };
                    }

                    return { ...item };
                }),
            ),
        );
    });

    return renderingSteps;
};
