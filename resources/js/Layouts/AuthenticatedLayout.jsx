import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import {
  DocumentTextIcon,
  CubeIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  TagIcon,
  Squares2X2Icon,
  BuildingOffice2Icon,
  ClipboardDocumentIcon,
  ShoppingCartIcon,
  CubeTransparentIcon,
  Bars3BottomRightIcon,
  ArrowLeftIcon,
  SunIcon,
  BellIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ user, header, children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    useEffect(() => {
        const handleTouchOutside = (e) => {
            if (menuOpen && !e.target.closest('nav')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('touchstart', handleTouchOutside);

        return () => {
            document.removeEventListener('touchstart', handleTouchOutside);
        };
    }, [menuOpen]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col md:flex-row">
            {menuOpen && (
                <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setMenuOpen(false)}></div>
            )}
            <nav className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-4 overflow-y-auto flex flex-col justify-between ${menuOpen ? 'block' : 'hidden md:block'}`}>
                <div>
                    <div className="flex items-center justify-between h-16">
                        <Link href={route('dashboard')}>
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-md ml-auto md:hidden"
                        >
                            <ArrowLeftIcon className="h-7 w-9 ml-4 text-gray-500" />
                        </button>
                    </div>

                    <div className="mt-11 flex flex-col space-y-4">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            <div className='flex flex-row space-x-2'>
                                <Squares2X2Icon className="h-5 w-5 mr-2 text-gray-500" />
                                Introduction
                            </div>
                        </NavLink>
                        <NavLink href={route('categorie.index')} active={route().current('categorie.index')}>
                            <div className='flex flex-row space-x-2'>
                                <TagIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Catégories
                            </div>
                        </NavLink>
                        <NavLink href={route('magasin.index')} active={route().current('magasin.index')}>
                            <div className='flex flex-row space-x-2'>
                                <BuildingOffice2Icon className="h-5 w-5 mr-2 text-gray-500" />
                                Magasins
                            </div>
                        </NavLink>
                        <NavLink href={route('catelogueProduit.index')} active={route().current('catelogueProduit.index')}>
                            <div className='flex flex-row space-x-2'>
                                <CubeIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Produits
                            </div>
                        </NavLink>
                        <NavLink href={route('expressionbesoin.index')} active={route().current('expressionbesoin.index')}>
                            <div className='flex flex-row space-x-2'>
                                <ClipboardDocumentIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Expression Besoin
                            </div>
                        </NavLink>
                        <NavLink href={route('bonAchat.index')} active={route().current('bonAchat.index')}>
                            <div className='flex flex-row space-x-2'>
                                <ShoppingCartIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Bon Achat
                            </div>
                        </NavLink>
                        <NavLink href={route('bonSortie.index')} active={route().current('bonSortie.index')}>
                            <div className='flex flex-row space-x-2'>
                                <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Bon Sortie
                            </div>
                        </NavLink>
                        <NavLink href={route('mouvmentStock.index')} active={route().current('mouvmentStock.index')}>
                            <div className='flex flex-row space-x-2'>
                                <CubeTransparentIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Mouvment Stock
                            </div>
                        </NavLink>
                        <NavLink href={route('user.index')} active={route().current('user.index')}>
                            <div className='flex flex-row space-x-2'>
                                <UsersIcon className="h-5 w-5 mr-2 text-gray-500" />
                                User
                            </div>
                        </NavLink>
                    </div>
                </div>
            </nav>

            <div className="flex-1 md:ml-64">
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 bg-gray-400 text-white rounded-md mr-4 md:hidden"
                            >
                                <Bars3BottomRightIcon className='h-5 w-5 text-gray-500' />
                            </button>
                            {header}
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
                                >
                                    <SunIcon className='h-5 w-5 text-gray-500' />
                                </button>
                                <button className="relative flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                                    <BellIcon className='h-5 w-5 text-gray-500' />
                                    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                                </button>

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md w-full">
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-between w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <span className="flex items-center">
                                                    {user.name}
                                                    <UserCircleIcon className='h-7 w-7 ml-2 text-gray-500' />
                                                </span>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            <div className='flex flex-row'>
                                                <UserIcon className='h-5 w-5 text-gray-500' />
                                                Profil
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            <div className='flex flex-row'>
                                                <ArrowLeftOnRectangleIcon className='h-5 w-5 text-gray-500' />
                                                Déconnexion
                                            </div>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </header>
                )}

                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
