'use client'
import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {authService, User} from '@/services/auth';
import TokenService from '@/services/token';
import {getUserFromToken} from '@/utils/jwt';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    loginWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                if (authService.isAuthenticated()) {
                    const token = TokenService.getAccessToken();
                    const userData = getUserFromToken(token);
                    if (userData) {
                        setUser(userData as unknown as User);
                    }
                }
            } catch (error) {
                console.error('Failed to initialize auth:', error);
                authService.logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth().then(r => {});
    }, []);

    const login = async (email: string, password: string) => {
        const {access_token} = await authService.login({email, password});
        if (access_token) {
            const userData = getUserFromToken(access_token);
            if (userData) {
                setUser(userData as unknown as User);
            }
        }
    };
    const signup = async (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => {
        const {access_token} = await authService.signup({firstName, lastName, email, password, confirmPassword});
        if (access_token) {
            const userData = getUserFromToken(access_token);
            if (userData) {
                setUser({
                    ...userData,
                    firstName: '',
                    lastName: '',
                    createdAt: new Date().toISOString(),
                });
            }
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const loginWithGoogle = () => {
        window.location.href = `${process.env.NEXT_API_BASE_URL}/auth/google`;
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated: !!user, login, signup, logout, loading, loginWithGoogle}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 