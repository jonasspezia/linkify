"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";

const Navbar = () => {
    const { user, signOut } = useAuthContext();
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                scroll ? "border-b" : "border-b-0"
            )}
        >
            <nav className="container flex h-16 items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">Linkify</span>
                </Link>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    {!user ? (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Entrar
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button size="sm">Registrar</Button>
                            </Link>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage
                                        src={user.user_metadata?.avatar_url}
                                        alt={user.user_metadata?.full_name || user.email}
                                    />
                                    <AvatarFallback>
                                        {user.email?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {user.user_metadata?.full_name || user.email}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href="/dashboard">
                                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                </Link>
                                <Link href="/profile">
                                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => signOut()}
                                >
                                    Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
