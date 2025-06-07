import { FormSelectFieldSize, createFormModel } from '@/features/select-field-size';
import { FieldCanvas, drawFieldModel } from '@/features/draw-field';
import { fieldContextMenuModel } from '@/features/open-context-menu';
import { FormSelectAlgorithm, buildShortPathModel } from '@/features/build-short-path';
import { fieldItemModel } from '@/entities/field-item';
import { ContextMenu } from '@/shared/ui';
import { useEffect, useState } from 'react';

export const App = () => {
    const { fieldSize, selectFieldSize, resetFieldSize } = createFormModel.useSelectFieldSize();
    const { fieldItems, changeFieldItem, createFieldItems } = fieldItemModel.useFieldItems();
    const { ref, drawFieldWithAwait } = drawFieldModel.useDrawField();

    const {
        configMenu: { isOpen, ...configMenu },
        openContextMenu,
        closeContextMenu,
    } = fieldContextMenuModel.useContextMenu(fieldSize, fieldItems, changeFieldItem);

    const { buildShortPath, isDrawAlgorithm } = buildShortPathModel.useBuildShortPath(fieldItems, drawFieldWithAwait);

    const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        if (fieldSize > 0 && ref.current) {
            const { width } = ref.current.getBoundingClientRect();

            setSize({ width, height: width });
        }
    }, [fieldSize, ref]);

    useEffect(() => {
        createFieldItems(size.width, size.height, fieldSize);
    }, [createFieldItems, size, fieldSize]);

    useEffect(() => {
        drawFieldWithAwait(fieldItems);
    }, [fieldItems, size, drawFieldWithAwait]);

    return (
        <>
            <header className="bg-gray-100 dark:bg-gray-900 py-4 shadow-md flex justify-center text-center">
                Визуализация алгоритмов поиска кратчайшего пути
            </header>
            <main className="container m-auto">
                {fieldSize > 0 && (
                    <section className="flex flex-col items-center">
                        <span className="p-5 text-sm text-center block mb-2 font-medium text-gray-900 dark:text-white">
                            Нажмите правой кнопкой на поле для открытия контекстного меню
                        </span>
                        <div className="max-w-[500px] w-full">
                            <FieldCanvas
                                ref={ref}
                                width={size.width}
                                height={size.height}
                                onClick={closeContextMenu}
                                onContextMenu={openContextMenu}
                            />
                            <ContextMenu open={isOpen} {...configMenu} />
                        </div>
                    </section>
                )}
                <section className="flex flex-col">
                    <FormSelectFieldSize onSubmit={selectFieldSize} onReset={resetFieldSize} />
                    {fieldSize > 0 && (
                        <FormSelectAlgorithm onSubmit={buildShortPath} disabled={isDrawAlgorithm || fieldSize === 0} />
                    )}
                </section>
            </main>
        </>
    );
};
