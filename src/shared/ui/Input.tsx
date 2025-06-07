import { FunctionComponent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = {
    label?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FunctionComponent<Props> = ({ label, id, ...attrs }) => {
    return (
        <div className="relative w-full max-w-md">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                type="text"
                id={id}
                {...attrs}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            />
        </div>
    );
};
