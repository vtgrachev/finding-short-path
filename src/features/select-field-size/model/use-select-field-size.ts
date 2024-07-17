import { useState } from 'react';

export const useSelectFieldSize = () => {
    const [fieldSize, setFieldSize] = useState(0);

    const selectFieldSize = (fieldSize: number) => {
        setFieldSize(fieldSize);
    };

    const resetFieldSize = () => {
        setFieldSize(0);
    };

    return {
        fieldSize,
        selectFieldSize,
        resetFieldSize,
    };
};
