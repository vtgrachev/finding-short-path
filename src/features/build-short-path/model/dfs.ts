import { fieldItemModel } from '@/entities/field-item';
import { getPath } from '@/features/build-short-path/model/get-path.ts';

export const dfs = (
    fieldsItem: fieldItemModel.FieldItem[][],
    startItem = fieldItemModel.getStartFieldItem(fieldsItem),
    passed = new Set([startItem?.id ?? '']),
    pathToEnd: Record<string, string | null> = { [startItem?.id ?? '']: null },
): fieldItemModel.FieldItem[][][] => {
    const endItem = fieldItemModel.getEndFieldItem(fieldsItem);

    if (startItem == null || endItem == null) {
        return [];
    }

    const renderingSteps: fieldItemModel.FieldItem[][][] = [];

    renderingSteps.push(
        fieldsItem.map((cols) =>
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

    if (endItem.id === startItem.id) {
        const path = getPath(pathToEnd, endItem.id);

        path.forEach((idPath) => {
            const lastStep = renderingSteps[renderingSteps.length - 1];

            renderingSteps.push(
                lastStep.map((cols) =>
                    cols.map((item) => {
                        if (item.id === idPath && !item.isEnd && !item.isStart) {
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
    } else {
        const nextItems = (fieldItemModel.getPathsFieldItem(fieldsItem, startItem) ?? []).filter(
            ({ id }) => !passed.has(id),
        );

        for (const item of nextItems) {
            pathToEnd[item.id] = startItem.id;

            passed.add(item.id);

            renderingSteps.push(...dfs(renderingSteps[renderingSteps.length - 1], item, passed, pathToEnd));

            if (passed.has(endItem.id)) {
                break;
            }
        }
    }

    return renderingSteps;
};
