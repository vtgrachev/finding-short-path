import { fieldItemModel } from '@/entities/field-item';

export const bfs = (fieldsItem: fieldItemModel.FieldItem[][], changeFieldItem: fieldItemModel.ChangeFieldItem) => {
    const startItem = fieldItemModel.getStartFieldItem(fieldsItem);

    const endItem = fieldItemModel.getEndFieldItem(fieldsItem);

    if (startItem === undefined || endItem === undefined) {
        return;
    }

    const queue: fieldItemModel.FieldItem[] = [startItem];

    const passed = new Set<string>();

    const pathToEnd: Record<string, string | null> = {
        [startItem.id]: null,
    };

    while (queue.length > 0) {
        const currentFieldItem = queue.shift();

        passed.add(currentFieldItem.id);
        changeFieldItem(currentFieldItem.id, { isPassed: true });

        if (currentFieldItem.id === endItem.id) {
            break;
        }

        const nextItems = (fieldItemModel.getPathsFieldItem(fieldsItem, currentFieldItem) ?? []).filter(
            ({ id }) => !passed.has(id),
        );

        nextItems.forEach((item) => {
            pathToEnd[item.id] = currentFieldItem.id;
        });

        queue.push(...nextItems);
    }

    const endPath = Object.keys(pathToEnd).find((key) => key === endItem.id);
    let startPath = pathToEnd[endPath] ?? null;

    while (startPath !== null) {
        changeFieldItem(startPath, { isAddedToPath: true });
        startPath = pathToEnd[startPath];
    }
};
