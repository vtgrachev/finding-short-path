import { fieldItemModel } from '@/entities/field-item';

export const dfs = (
    fieldsItem: fieldItemModel.FieldItem[][],
    changeFieldItem: fieldItemModel.ChangeFieldItem,
    startItem = fieldItemModel.getStartFieldItem(fieldsItem),
    passed = new Set([startItem.id]),
    pathToEnd = { [startItem.id]: null },
) => {
    const endItem = fieldItemModel.getEndFieldItem(fieldsItem);

    if (startItem === undefined || endItem === undefined) {
        return;
    }

    changeFieldItem(startItem.id, { isPassed: true });

    const nextItems = (fieldItemModel.getPathsFieldItem(fieldsItem, startItem) ?? []).filter(
        ({ id }) => !passed.has(id),
    );

    for (const item of nextItems) {
        pathToEnd[item.id] = startItem.id;

        passed.add(item.id);
        changeFieldItem(item.id, { isPassed: true });

        if (item.id === endItem.id) {
            const endPath = Object.keys(pathToEnd).find((key) => key === endItem.id);
            let startPath = pathToEnd[endPath] ?? null;

            while (startPath !== null) {
                changeFieldItem(startPath, { isAddedToPath: true });
                startPath = pathToEnd[startPath];
            }

            return;
        } else {
            dfs(fieldsItem, changeFieldItem, item, passed, pathToEnd);
        }
    }
};
