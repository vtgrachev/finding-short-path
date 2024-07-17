import { FormSelectFieldSize, createFormModel } from '@/features/select-field-size';
import { FieldCanvas, paintFieldModel } from '@/features/paint-field';
import { fieldContextMenuModel } from '@/features/open-context-menu';
import { FormSelectAlgorithm } from '@/features/build-short-path';
import { fieldItemModel } from '@/entities/field-item';
import { ContextMenu } from '@/shared/ui';
import { FormEvent } from 'react';

export const App = () => {
    const { fieldSize, selectFieldSize, resetFieldSize } = createFormModel.useSelectFieldSize();

    const { fieldItems, changeFieldItem } = fieldItemModel.useFieldItems(
        paintFieldModel.CANVAS_WIDTH,
        paintFieldModel.CANVAS_HEIGHT,
        fieldSize,
    );

    const { ref } = paintFieldModel.usePaintField(fieldItems);

    const {
        configMenu: { isOpen, ...configMenu },
        openContextMenu,
        closeContextMenu,
    } = fieldContextMenuModel.useContextMenu(fieldSize, fieldItems, changeFieldItem);

    const onSubmit = (algorithm: string, event: FormEvent<HTMLFormElement>) => {
        if (!fieldItems?.some((col) => col.some(({ isStart }) => isStart))) {
            alert('Не задана точка начала.');
            return;
        }

        if (!fieldItems?.some((col) => col.some(({ isEnd }) => isEnd))) {
            alert('Не задана точка цели.');
            return;
        }
    };

    return (
        <>
            <header className="text-lg text-center px-10 py-5">Визуализация алгоритмов поиска кратчайшего пути</header>
            <main className="px-10 py-5">
                <section>
                    <FormSelectFieldSize onSubmit={selectFieldSize} onReset={resetFieldSize} />
                </section>
                {fieldSize > 0 && (
                    <section className="flex divide-x">
                        <div className="p-5">
                            <div className="p-5 text-sm text-center">
                                Нажмите правой кнопкой на поле для открытия контекстного меню
                            </div>
                            <FieldCanvas ref={ref} onClick={closeContextMenu} onContextMenu={openContextMenu} />
                            <ContextMenu open={isOpen} {...configMenu} />
                        </div>
                        <div className="p-5">
                            <FormSelectAlgorithm onSubmit={onSubmit} />
                        </div>
                    </section>
                )}
            </main>
        </>
    );
};
