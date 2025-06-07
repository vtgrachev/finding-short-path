import { FormSelectFieldSize, createFormModel } from '@/features/select-field-size';
import { FieldCanvas, drawFieldModel } from '@/features/draw-field';
import { fieldContextMenuModel } from '@/features/open-context-menu';
import { FormSelectAlgorithm, buildShortPathModel } from '@/features/build-short-path';
import { fieldItemModel } from '@/entities/field-item';
import { ContextMenu } from '@/shared/ui';

export const App = () => {
    const { fieldSize, selectFieldSize, resetFieldSize } = createFormModel.useSelectFieldSize();

    const { fieldItems, changeFieldItem } = fieldItemModel.useFieldItems(
        drawFieldModel.CANVAS_WIDTH,
        drawFieldModel.CANVAS_HEIGHT,
        fieldSize,
    );

    const { ref, drawFieldWithAwait } = drawFieldModel.useDrawField(fieldItems);

    const {
        configMenu: { isOpen, ...configMenu },
        openContextMenu,
        closeContextMenu,
    } = fieldContextMenuModel.useContextMenu(fieldSize, fieldItems, changeFieldItem);

    const { buildShortPath, isDrawAlgorithm } = buildShortPathModel.useBuildShortPath(fieldItems, drawFieldWithAwait);

    return (
        <>
            <header className="bg-gray-100 dark:bg-gray-900 py-4 shadow-md sticky top-0 z-50 flex justify-center">
                Визуализация алгоритмов поиска кратчайшего пути
            </header>
            <main className="container m-auto">
                {fieldSize > 0 && (
                    <section className="flex flex-col items-center">
                        <span className="p-5 text-sm text-center block mb-2 font-medium text-gray-900 dark:text-white">
                            Нажмите правой кнопкой на поле для открытия контекстного меню
                        </span>
                        <div className="max-w-[500px]">
                            <FieldCanvas ref={ref} onClick={closeContextMenu} onContextMenu={openContextMenu} />
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
