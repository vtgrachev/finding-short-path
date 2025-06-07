import { ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent } from 'react';

export const Button: FunctionComponent<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ ...attrs }) => {
    return (
        <div className="flex justify-center mt-8">
            <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-base font-medium leading-normal text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md shadow-sm transition duration-150 ease-in-out"
                {...attrs}
            />
        </div>
    );
};
