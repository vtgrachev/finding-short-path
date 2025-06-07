import { FormEvent, FunctionComponent } from 'react';
import { Button, Select } from '@/shared/ui';
import { ALGORITHMS_FIND_SHORT_PATH } from './model';

type Props = {
    disabled?: boolean;
    onSubmit?: (algorithm: string, event: FormEvent<HTMLFormElement>) => void;
};

export const FormSelectAlgorithm: FunctionComponent<Props> = ({ onSubmit, disabled = false }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        onSubmit?.(formData.get('algorithm') as string, event);
    };

    return (
        <form className="divide-y" onSubmit={handleSubmit}>
            <div className="flex flex-col p-5">
                <Select
                    id="select-algorithm"
                    label="Алгоритм"
                    name="algorithm"
                    options={ALGORITHMS_FIND_SHORT_PATH}
                    required
                    disabled={disabled}
                />
            </div>
            <div className="flex gap-2 p-5">
                <Button type="submit" disabled={disabled}>
                    Запустить
                </Button>
            </div>
        </form>
    );
};
