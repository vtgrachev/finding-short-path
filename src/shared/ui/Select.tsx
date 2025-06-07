import { FunctionComponent, ReactNode, SelectHTMLAttributes } from 'react';

type Props = {
    id: string;
    options: { key: string; children: ReactNode; value?: string }[];
    label?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select: FunctionComponent<Props> = ({ options, label, id, disabled = false, ...attrs }) => {
    return (
        <div className="relative w-full max-w-md">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <select
                id={id}
                disabled={disabled}
                {...attrs}
                className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option disabled selected>
                    Выберите...
                </option>
                {options.map(({ key, ...rest }) => (
                    <option key={key} {...rest} />
                ))}
            </select>
        </div>
    );
};
