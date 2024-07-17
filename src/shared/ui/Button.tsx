import { ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent } from 'react';

export const Button: FunctionComponent<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, ...props }) => {
    return (
        <button
            className={`text-sm bg-gray-300 rounded-none p-2 border border-slate-300 hover:border-slate-400 ${className}`}
            {...props}
        />
    );
};
