import { fieldItemModel } from '@/entities/field-item';
import { getPath } from '@/features/build-short-path/model/get-path.ts';

export const bfs = (fieldsItem: fieldItemModel.FieldItem[][]) => {
    const renderingSteps = [fieldsItem];

    const startItem = fieldItemModel.getStartFieldItem(fieldsItem);

    const endItem = fieldItemModel.getEndFieldItem(fieldsItem);

    if (startItem == null || endItem == null) {
        return null;
    }

    const queue: fieldItemModel.FieldItem[] = [startItem];

    const passed = new Set([startItem.id]);

    const pathToEnd: Record<string, string | null> = {
        [startItem.id]: null,
    };

    while (queue.length > 0) {
        const currentFieldItem = queue.shift();

        if (currentFieldItem == null) {
            break;
        }

        const lastStep = renderingSteps[renderingSteps.length - 1];

        renderingSteps.push(
            lastStep.map((cols) =>
                cols.map((item) => {
                    if (item.id === currentFieldItem.id) {
                        return {
                            ...item,
                            isPassed: true,
                        };
                    }

                    return { ...item };
                }),
            ),
        );

        if (currentFieldItem.id === endItem.id) {
            break;
        }

        const nextItems = (fieldItemModel.getPathsFieldItem(fieldsItem, currentFieldItem) ?? []).filter(
            ({ id }) => !passed.has(id),
        );

        nextItems.forEach((item) => {
            passed.add(item.id);
            pathToEnd[item.id] = currentFieldItem.id;
        });

        queue.push(...nextItems);
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
