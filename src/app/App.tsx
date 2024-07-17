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
                            <FormSelectAlgorithm onSubmit={buildShortPath} disabled={isDrawAlgorithm} />
                        </div>
                    </section>
                )}
            </main>
        </>
    );
};
