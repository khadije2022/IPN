import { Link } from '@inertiajs/react';
import classNames from 'classnames';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={classNames(
                'block px-4 py-2 rounded-md transition duration-150 ease-in-out',
                {
                    'text-white bg-gray-200 dark:bg-gray-700': active,
                    'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800': !active,
                },
                className
            )}
        >
            {children}
        </Link>
    );
}
