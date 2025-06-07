import { FunctionComponent, MouseEvent } from 'react';

export interface OptionContextMenu {
    id: string;
    title: string;
    action: (event: MouseEvent<HTMLLIElement>) => void;
}

type Props = {
    open: boolean;
    positionTop: number;
    positionLeft: number;
    options?: OptionContextMenu[];
};

export const ContextMenu: FunctionComponent<Props> = ({ open, positionTop, positionLeft, options = [] }) => {
    return (
        <ul
            className={`fixed p-2 bg-gray-50 rounded-[8px] border-gray-300 text-gray-900 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 divide-y transition-opacity opacity-0 z-10 ${open && 'opacity-100'}`}
            style={{ top: `${positionTop}px`, left: `${positionLeft}px` }}
        >
            {options.map(({ id, title, action }) => (
                <li key={id} className="cursor-pointer p-2 hover:bg-blue-400 " onClick={action}>
                    {title}
                </li>
            ))}
        </ul>
    );
};
