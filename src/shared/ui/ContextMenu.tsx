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
            className={`fixed p-2 rounded-md border-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 divide-y transition-opacity opacity-0 ${open && 'opacity-100'}`}
            style={{ top: `${positionTop}px`, left: `${positionLeft}px` }}
        >
            {options.map(({ id, title, action }) => (
                <li key={id} className="cursor-pointer p-2 hover:bg-gray-400" onClick={action}>
                    {title}
                </li>
            ))}
        </ul>
    );
};
