import { FormEvent, FunctionComponent } from 'react';
import { Button, Input } from '@/shared/ui';

type Props = {
    onSubmit?: (sizeField: number, event: FormEvent<HTMLFormElement>) => void;
    onReset?: (event: FormEvent<HTMLFormElement>) => void;
};

export const FormSelectFieldSize: FunctionComponent<Props> = ({ onSubmit, onReset }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        onSubmit?.(Number(formData.get('sizeField')), event);
    };

    const handleReset = (event: FormEvent<HTMLFormElement>) => {
        onReset?.(event);
    };

    return (
        <form className="divide-y" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="flex gap-2 p-5">
                <Input
                    id="size-field"
                    name="sizeField"
                    className="w-48"
                    type="number"
                    label="Размер поля"
                    required
                    min={2}
                    max={20}
                />
            </div>
            <div className="flex gap-2 p-5">
                <Button type="submit">Построить поле</Button>
                <Button type="reset">Сбросить</Button>
            </div>
        </form>
    );
};
