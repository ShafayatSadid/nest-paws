'use client'
import { Avatar, Button, Dropdown, Label, Skeleton } from '@heroui/react';
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import Link from 'next/link';
import React, { useRef } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoClose, IoMoonOutline } from 'react-icons/io5';
import { ThemeSwitch } from './ThemeSwitch';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const NavBar = () => {


    const sideMenuRef = useRef()

    const router = useRouter()

    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(0)'
    }

    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-100%)'
    }

    // get session
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    console.log('user:', user);

    const handleSignOut = async () => {
        await authClient.signOut();
        router("/")
    }

    return (
        <div>
            <nav className='w-full fixed px-5 lg:px-8 py-4 flex justify-between items-center z-50 bg-cream/80 dark:bg-secondary/90 backdrop-blur-md shadow-sm'>

                {/* mobile menu */}
                <div className='md:hidden'>

                    <div className=''>
                        <HiMenuAlt1 className='w-6 h-6 text-dark dark:text-cream cursor-pointer hover:text-primary transition' onClick={openMenu} />
                    </div>

                    <ul ref={sideMenuRef}
                        style={{ transform: "translateX(-100%)" }}
                        className='flex md:hidden flex-col gap-4 py-20 px-10 fixed left-0 top-0 bottom-0 w-64 z-50 h-screen bg-cream dark:bg-secondary shadow-2xl transition duration-300 text-dark dark:text-cream'>

                        <div className="absolute left-6 top-6">
                            <IoClose
                                onClick={closeMenu}
                                className="w-6 h-6 cursor-pointer hover:text-primary transition"
                            />
                        </div>
                        <li>
                            <Link
                                onClick={closeMenu}
                                href="/"
                                className="font-heading text-lg font-bold hover:text-primary transition"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={closeMenu}
                                href="/all-pets"
                                className="font-heading text-lg font-bold hover:text-primary transition"
                            >
                                All Pets
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={closeMenu}
                                href="/my-requests"
                                className="font-heading text-lg font-bold hover:text-primary transition"
                            >
                                My Requests
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={closeMenu}
                                href="/add-pet"
                                className="font-heading text-lg font-bold hover:text-primary transition"
                            >
                                Add Pet
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* logo */}
                <div>
                    <h1 className="font-heading text-2xl font-extrabold text-secondary dark:text-cream tracking-tight">
                        Nest<span className="text-primary">Paws</span>
                    </h1>
                </div>



                {/* menu */}
                <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-8 py-2.5 bg-cream/70 dark:bg-secondary/70 backdrop-blur-sm shadow-md border border-primary/10 dark:border-cream/10">
                    <li>
                        <Link
                            href="/"
                            className="font-body text-sm font-semibold text-dark dark:text-cream hover:text-primary transition"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/all-pets"
                            className="font-body text-sm font-semibold text-dark dark:text-cream hover:text-primary transition"
                        >
                            All Pets
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/my-requests"
                            className="font-body text-sm font-semibold text-dark dark:text-cream hover:text-primary transition"
                        >
                            My Requests
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/add-pet"
                            className="font-body text-sm font-semibold text-dark dark:text-cream hover:text-primary transition"
                        >
                            Add Pet
                        </Link>
                    </li>
                </ul>

                {/* Right Side: Theme + Profile */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <ThemeSwitch />

                    {/* Profile Button */}

                    <div>


                        {isPending ?
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-3 w-36 rounded-lg" />
                                    <Skeleton className="h-3 w-24 rounded-lg" />
                                </div>
                            </div>
                            : user ? <Dropdown>
                                <Dropdown.Trigger className="rounded-full">
                                    <Avatar>
                                        <Avatar.Image
                                            alt={user?.name}
                                            src={user?.image}
                                        />
                                        <Avatar.Fallback delayMs={600}>{user?.name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                                    </Avatar>
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <div className="px-3 pt-3 pb-1">
                                        <div className="flex items-center gap-2">
                                            <Avatar size="sm">
                                                <Avatar.Image
                                                    alt="Jane"
                                                    src={user?.image}
                                                />
                                                <Avatar.Fallback delayMs={600}>{user?.name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-0">
                                                <p className="text-sm leading-5 font-medium">{user?.name}</p>
                                                <p className="text-xs leading-none text-muted">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Menu>
                                        <Dropdown.Item id="dashboard" textValue="Dashboard">
                                            <Label>Dashboard</Label>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="profile" textValue="Profile">
                                            <Label>Profile</Label>
                                        </Dropdown.Item>

                                        {/* log out */}
                                        <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                                            <div onClick={handleSignOut} className="flex w-full items-center justify-between gap-2">
                                                <Label>Log Out</Label>
                                                <ArrowRightFromSquare className="size-3.5 text-danger" />
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown> :
                                <Button className="bg-primary text-white font-heading font-semibold">
                                    <Link href={'/login'}>Login</Link>
                                </Button>}
                    </div>
                </div>
            </nav>

        </div >
    );
};

export default NavBar;