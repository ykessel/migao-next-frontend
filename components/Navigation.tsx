"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import { Heart, Menu, X, User, LogOut } from "lucide-react";
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
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated, user, logout } = useAuth();

    const handleFavoritesClick = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        router.push('/favorites');
    };

    const handlePublishClick = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        router.push('/publish-property');
    };

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl mx-auto mb-4">
            <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
                            <div className="flex items-center gap-2">
                                <Image alt="logo" src="/logo.svg" width={100} height={100} />
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href={'/'} className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                                Buscar
                            </Link>
                            <button 
                                onClick={handlePublishClick}
                                className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
                            >
                                Publicar Propiedad
                            </button>
                            <Link href={'/about-us'} className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                                Acerca de
                            </Link>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-700 hover:text-teal-600"
                                onClick={handleFavoritesClick}
                            >
                                <Heart className="w-4 h-4 mr-2"/>
                                Favoritos
                                <Badge variant="secondary" className="ml-2">
                                    3
                                </Badge>
                            </Button>
                        </nav>

                        {/* Desktop Auth */}
                        <div className="hidden md:flex items-center gap-4">
                            {isAuthenticated ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="w-9 h-9 cursor-pointer border-2 border-teal-500">
                                            <AvatarImage src={user?.avatar?.url} alt={user?.firstName || 'U'} />
                                            <AvatarFallback>{user?.firstName?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push('/profile')}>
                                            Perfil
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push('/favorites')}>
                                            Favoritos
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => logout()}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Cerrar Sesión
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => router.push('/login')}
                                    >
                                        <User className="w-4 h-4 mr-2"/>
                                        Iniciar Sesión
                                    </Button>
                                    <Button 
                                        variant="default" 
                                        size="sm"
                                        onClick={() => router.push('/signup')}
                                    >
                                        Registrarse
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200">
                            <div className="flex flex-col space-y-4">
                                <Link href={'/'} className="text-gray-700 hover:text-teal-600 font-medium">
                                    Buscar
                                </Link>
                                <button 
                                    onClick={handlePublishClick}
                                    className="text-gray-700 hover:text-teal-600 font-medium"
                                >
                                    Publicar Propiedad
                                </button>
                                <Link href={'/about-us'} className="text-gray-700 hover:text-teal-600 font-medium">
                                    Acerca de
                                </Link>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="justify-start text-gray-700 hover:text-teal-600"
                                    onClick={handleFavoritesClick}
                                >
                                    <Heart className="w-4 h-4 mr-2"/>
                                    Favoritos
                                    <Badge variant="secondary" className="ml-2">
                                        3
                                    </Badge>
                                </Button>
                                {isAuthenticated ? (
                                    <>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="justify-start"
                                            onClick={() => router.push('/profile')}
                                        >
                                            <User className="w-4 h-4 mr-2"/>
                                            Mi Cuenta
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="justify-start"
                                            onClick={() => logout()}
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Cerrar Sesión
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="justify-start"
                                            onClick={() => router.push('/login')}
                                        >
                                            <User className="w-4 h-4 mr-2"/>
                                            Iniciar Sesión
                                        </Button>
                                        <Button 
                                            variant="default" 
                                            size="sm" 
                                            className="justify-start"
                                            onClick={() => router.push('/signup')}
                                        >
                                            Registrarse
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
