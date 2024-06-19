import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            <nav className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-4 overflow-y-auto flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between h-16">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>
<br/><br/>
                    <div className="flex flex-col space-y-4 mt-6">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </NavLink>
                        <NavLink href={route('categorie.index')} active={route().current('categorie.index')}>
                            Catégories
                        </NavLink>
                        <NavLink href={route('magasin.index')} active={route().current('magasin.index')}>
                            Magasins
                        </NavLink>
                        <NavLink href={route('catelogueProduit.index')} active={route().current('catelogueProduit.index')}>
                            Produits
                        </NavLink>
                        <NavLink href={route('expressionbesoin.index')} active={route().current('expressionbesoin.index')}>
                            Expression Besoin
                        </NavLink>
                        <NavLink href={route('bonAchat.index')} active={route().current('bonAchat.index')}>
                            Bon Achat
                        </NavLink>
                        <NavLink href={route('bonSortie.index')} active={route().current('bonSortie.index')}>
                            Bon Sortie
                        </NavLink>
                        <NavLink href={route('mouvmentStock.index')} active={route().current('mouvmentStock.index')}>
                            Mouvment Stock
                        </NavLink>
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md w-full">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-between w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none transition ease-in-out duration-150"
                                >
                                    {user.name}
                                    <svg
                                        className="ml-2 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profil</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Déconnexion
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </nav>

            <div className="ml-64 flex-1">
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
