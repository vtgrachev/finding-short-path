import { FunctionComponent, SelectHTMLAttributes, ReactNode } from 'react';

type Props = {
    options: { key: string; children: ReactNode; value?: string }[];
    label?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select: FunctionComponent<Props> = ({ options, label, id, className = '', ...attrs }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {label !== undefined && (
                <label htmlFor={id} className="text-sm">
                    Алгоритм
                </label>
            )}
            <select id={id} className="p-2 border-2 w-64" {...attrs}>
                {options.map(({ key, ...rest }) => (
                    <option key={key} {...rest} />
                ))}
            </select>
        </div>
    );
};
