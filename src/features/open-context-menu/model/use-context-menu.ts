import { useState, MouseEvent, useEffect } from 'react';
import { OptionContextMenu } from '@/shared/ui';
import { fieldItemModel } from '@/entities/field-item';

export const useContextMenu = (
    fieldSize: number,
    fieldItems: fieldItemModel.FieldItem[][],
    changeFieldItem: fieldItemModel.ChangeFieldItem,
) => {
    const [configMenu, setConfigMenu] = useState<{
        isOpen: boolean;
        positionTop: number;
        positionLeft: number;
        options: OptionContextMenu[];
    }>({ isOpen: false, positionTop: 0, positionLeft: 0, options: [] });

    useEffect(() => {
        if (fieldSize === 0) {
            setConfigMenu({ isOpen: false, positionLeft: 0, positionTop: 0, options: [] });
        }
    }, [fieldSize]);

    const closeContextMenu = () => {
        setConfigMenu({ isOpen: false, positionTop: 0, positionLeft: 0, options: [] });
    };

    const openContextMenu = (event: MouseEvent<HTMLCanvasElement>) => {
        const { indexRow, indexCol } = fieldItemModel.getTargetIndex(event, fieldSize);

        const targetItem = fieldItems[indexRow][indexCol];

        const options: OptionContextMenu[] = [];

        if (targetItem.isStart) {
            options.push({
                id: 'delete-begin-point',
                title: 'Убрать точку начала',
                action: () => {
                    changeFieldItem(indexRow, indexCol, { isStart: false });

                    closeContextMenu();
                },
            });
        } else {
            const isExistStart = fieldItems.some((cols) => cols.some(({ isStart }) => isStart));

            if (!isExistStart && !targetItem.isEnd && !targetItem.isObstacle) {
                options.push({
                    id: 'add-begin-point',
                    title: 'Выбрать как точку начала',
                    action: () => {
                        changeFieldItem(indexRow, indexCol, { isStart: true });

                        closeContextMenu();
                    },
                });
            }
        }

        if (targetItem.isEnd) {
            options.push({
                id: 'delete-end-point',
                title: 'Убрать точку цели',
                action: () => {
                    changeFieldItem(indexRow, indexCol, { isEnd: false });

                    closeContextMenu();
                },
            });
        } else {
            const isExistEnd = fieldItems.some((cols) => cols.some(({ isEnd }) => isEnd));

            if (!isExistEnd && !targetItem.isStart && !targetItem.isObstacle) {
                options.push({
                    id: 'add-end-point',
                    title: 'Выбрать как точку цели',
                    action: () => {
                        changeFieldItem(indexRow, indexCol, { isEnd: true });

                        closeContextMenu();
                    },
                });
            }
        }

        if (!targetItem.isStart && !targetItem.isEnd) {
            options.push({
                id: targetItem.isObstacle ? 'delete-obstacle' : 'add-obstacle',
                title: targetItem.isObstacle ? 'Удалить препятствие' : 'Добавить препятствие',
                action: () => {
                    changeFieldItem(indexRow, indexCol, { isObstacle: !targetItem.isObstacle });

                    closeContextMenu();
                },
            });
        }

        if (!targetItem.isStart && !targetItem.isEnd && !targetItem.isObstacle) {
            options.push({
                id: targetItem.cost === undefined ? 'add-cost' : 'delete-cost',
                title: targetItem.cost === undefined ? 'Указать стоимость прохода' : 'Удалить стоимость прохода',
                action: () => {
                    if (targetItem.cost === undefined) {
                        const cost = Number(window.prompt('Укажите стоимость'));

                        if (Number.isNaN(cost)) {
                            alert('Стоимость указана не верно!');
                        } else {
                            changeFieldItem(indexRow, indexCol, { cost });
                        }
                    } else {
                        changeFieldItem(indexRow, indexCol, { cost: undefined });
                    }

                    closeContextMenu();
                },
            });
        }

        if (options.length > 0) {
            setConfigMenu({
                isOpen: true,
                positionLeft: event.clientX,
                positionTop: event.clientY,
                options,
            });
        }
    };

    return { configMenu, openContextMenu, closeContextMenu };
};
