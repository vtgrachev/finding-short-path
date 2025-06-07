import { useCallback, useState } from 'react';
import { FieldItem, ChangeFieldItem } from './types.ts';
import { createFieldItems as createItems } from './create-field-items.ts';

export const useFieldItems = () => {
    const [fieldItems, setFieldItems] = useState<FieldItem[][]>([]);

    const changeFieldItem: ChangeFieldItem = (id: string, change) => {
        setFieldItems((rows) =>
            rows.map((cols) =>
                cols.map((item) => {
                    if (item.id === id) {
                        return { ...item, ...change };
                    }

                    return { ...item };
                }),
            ),
        );
    };

    const createFieldItems = useCallback((widthField: number, heightField: number, fieldSize: number) => {
        setFieldItems(createItems(widthField, heightField, fieldSize));
    }, []);

    return { fieldItems, changeFieldItem, createFieldItems };
};
