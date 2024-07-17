import { FunctionComponent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = {
    label?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FunctionComponent<Props> = ({ className = '', id, label, ...props }) => {
    return (
        <div className="flex flex-col gap-1">
            {label !== undefined && (
                <label htmlFor={id} className="text-sm">
                    {label}
                </label>
            )}
            <input id={id} className={`p-2 border-2  shadow-inner ${className}`} {...props} />
        </div>
    );
};
