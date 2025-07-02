"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, User, LogOut, Search, PlusCircle, Info } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";

const navigationItems = [
    { href: '/', label: 'Buscar', icon: Search },
    { href: '/publish-property', label: 'Publicar Propiedad', icon: PlusCircle, authRequired: true },
    { href: '/about-us', label: 'Acerca de', icon: Info },
];

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuth();

    // Handle scroll effect for navigation background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFavoritesClick = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        router.push('/favorites');
        setIsMenuOpen(false);
    };



    const handleNavItemClick = (href: string, authRequired?: boolean) => {
        if (authRequired && !isAuthenticated) {
            router.push('/login');
            return;
        }
        router.push(href);
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
    };

    const isActiveRoute = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    const navClasses = `
        fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl mx-auto
        transition-all duration-300 ease-in-out
        ${isScrolled 
            ? 'glass-effect shadow-glass backdrop-blur-md' 
            : 'bg-white/40 backdrop-blur-sm shadow-lg'
        }
        rounded-2xl border ${isScrolled ? 'border-white/30' : 'border-white/20'}
    `;

    // Mobile Navigation Sheet
    const MobileNavigation = () => (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="md:hidden p-2 hover:bg-white/20 transition-colors"
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-5 h-5 text-gray-700"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
                <SheetHeader className="border-b border-gray-200 pb-4 mb-6">
                    <SheetTitle className="flex items-center gap-2">
                        <Image alt="logo" src="/logo.svg" width={32} height={32} />
                        <span className="font-bold text-xl gradient-text">MiGao</span>
                    </SheetTitle>
                </SheetHeader>

                <nav className="space-y-2">
                    {navigationItems.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => handleNavItemClick(item.href, item.authRequired)}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                                transition-all duration-200 hover:bg-teal-50
                                ${isActiveRoute(item.href) 
                                    ? 'bg-teal-100 text-teal-700 font-medium' 
                                    : 'text-gray-700 hover:text-teal-600'
                                }
                            `}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}

                    <button
                        onClick={handleFavoritesClick}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
                    >
                        <Heart className="w-5 h-5" />
                        Favoritos
                        <Badge variant="secondary" className="ml-auto">3</Badge>
                    </button>
                </nav>

                <div className="border-t border-gray-200 pt-6 mt-6">
                    {isAuthenticated ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 px-4 py-3">
                                <Avatar className="w-10 h-10 border-2 border-teal-500">
                                    <AvatarImage src={user?.avatar?.url} alt={user?.firstName || 'U'} />
                                    <AvatarFallback className="bg-teal-100 text-teal-700">
                                        {user?.firstName?.[0] || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => {
                                    router.push('/profile');
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
                            >
                                <User className="w-5 h-5" />
                                Mi Perfil
                            </button>
                            
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all duration-200"
                            >
                                <LogOut className="w-5 h-5" />
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Button 
                                onClick={() => {
                                    router.push('/login');
                                    setIsMenuOpen(false);
                                }}
                                variant="outline" 
                                className="w-full justify-start gap-3 h-12"
                            >
                                <User className="w-5 h-5" />
                                Iniciar Sesión
                            </Button>
                            <Button 
                                onClick={() => {
                                    router.push('/signup');
                                    setIsMenuOpen(false);
                                }}
                                className="w-full btn-primary h-12"
                            >
                                Registrarse
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );

    return (
        <header className={navClasses}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
                        aria-label="Go to homepage"
                    >
                        <div className="relative">
                            <Image 
                                alt="MiGao logo" 
                                src="/logo.svg" 
                                width={40} 
                                height={40} 
                                className="group-hover:scale-110 transition-transform duration-200"
                            />
                        </div>
                        <span className="hidden sm:block font-bold text-xl gradient-text">
                            MiGao
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => {
                                    if (item.authRequired && !isAuthenticated) {
                                        e.preventDefault();
                                        handleNavItemClick(item.href, item.authRequired);
                                    }
                                }}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                                    transition-all duration-200 hover:bg-white/20
                                    ${isActiveRoute(item.href) 
                                        ? 'text-teal-700 bg-white/30 shadow-sm' 
                                        : 'text-gray-700 hover:text-teal-600'
                                    }
                                `}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="hidden lg:inline">{item.label}</span>
                            </Link>
                        ))}

                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-700 hover:text-teal-600 hover:bg-white/20 transition-all duration-200"
                            onClick={handleFavoritesClick}
                        >
                            <Heart className="w-4 h-4 mr-2"/>
                            <span className="hidden lg:inline">Favoritos</span>
                            <Badge variant="secondary" className="ml-2 bg-teal-100 text-teal-700">
                                3
                            </Badge>
                        </Button>
                    </nav>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/20 transition-all duration-200 group">
                                        <Avatar className="w-9 h-9 border-2 border-teal-500 group-hover:border-teal-600 transition-colors">
                                            <AvatarImage src={user?.avatar?.url} alt={user?.firstName || 'U'} />
                                            <AvatarFallback className="bg-teal-100 text-teal-700 font-medium">
                                                {user?.firstName?.[0] || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="hidden xl:block text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors">
                                            {user?.firstName}
                                        </span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border-white/20">
                                    <DropdownMenuLabel className="font-semibold">
                                        Mi Cuenta
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        onClick={() => router.push('/profile')}
                                        className="cursor-pointer hover:bg-teal-50 hover:text-teal-700"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Perfil
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={() => router.push('/favorites')}
                                        className="cursor-pointer hover:bg-teal-50 hover:text-teal-700"
                                    >
                                        <Heart className="w-4 h-4 mr-2" />
                                        Favoritos
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        onClick={handleLogout}
                                        className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Cerrar Sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => router.push('/login')}
                                    className="text-gray-700 hover:text-teal-600 hover:bg-white/20 transition-all duration-200"
                                >
                                    <User className="w-4 h-4 mr-2"/>
                                    <span className="hidden lg:inline">Iniciar Sesión</span>
                                </Button>
                                <Button 
                                    size="sm"
                                    onClick={() => router.push('/signup')}
                                    className="btn-primary"
                                >
                                    Registrarse
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <MobileNavigation />
                </div>
            </div>
        </header>
    );
};
