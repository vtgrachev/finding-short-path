import { useEffect, useState } from 'react';
import { FieldItem, ChangeFieldItem } from './types.ts';
import { createFieldItems } from './create-field-items.ts';

export const useFieldItems = (widthField: number, heightField: number, fieldSize: number) => {
    const [fieldItems, setFieldItems] = useState<FieldItem[][]>(() =>
        createFieldItems(widthField, heightField, fieldSize),
    );

    useEffect(() => {
        setFieldItems(createFieldItems(widthField, heightField, fieldSize));
    }, [widthField, heightField, fieldSize]);

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

    return { fieldItems, changeFieldItem };
};
