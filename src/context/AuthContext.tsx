'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient, publicApi } from '@/lib/api';

interface User {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    googleId?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    googleLogin: (idToken: string) => Promise<void>;
    demoLogin: () => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch full user profile from backend
    const fetchProfile = useCallback(async () => {
        try {
            const data = await apiClient<{ success: boolean; data: User }>('/api/profile');
            setUser(data.data);
        } catch (err) {
            console.error('Failed to fetch profile');
        }
    }, []);

    // On mount, check for saved token and validate it
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            // Fetch the full profile after token is set
            fetchProfile().finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [fetchProfile]);

    const handleLoginSuccess = useCallback(
        (accessToken: string, refreshToken: string) => {
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setToken(accessToken);
            // Fetch full profile after login
            fetchProfile();
        },
        [fetchProfile]
    );

    const login = useCallback(
        async (email: string, password: string) => {
            const data = await publicApi<{
                success: boolean;
                data: { user: User; tokens: { accessToken: string; refreshToken: string } };
            }>('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            handleLoginSuccess(data.data.tokens.accessToken, data.data.tokens.refreshToken);
        },
        [handleLoginSuccess]
    );

    const register = useCallback(
        async (name: string, email: string, password: string) => {
            const data = await publicApi<{
                success: boolean;
                data: { user: User; tokens: { accessToken: string; refreshToken: string } };
            }>('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
            });
            handleLoginSuccess(data.data.tokens.accessToken, data.data.tokens.refreshToken);
        },
        [handleLoginSuccess]
    );

    const googleLogin = useCallback(
        async (idToken: string) => {
            const data = await publicApi<{
                success: boolean;
                data: { user: User; tokens: { accessToken: string; refreshToken: string } };
            }>('/api/auth/google', {
                method: 'POST',
                body: JSON.stringify({ idToken }),
            });
            handleLoginSuccess(data.data.tokens.accessToken, data.data.tokens.refreshToken);
        },
        [handleLoginSuccess]
    );

    const demoLogin = useCallback(async () => {
        const creds = await publicApi<{
            success: boolean;
            data: { email: string; password: string };
        }>('/api/auth/demo');
        await login(creds.data.email, creds.data.password);
    }, [login]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                googleLogin,
                demoLogin,
                logout,
                isLoading,
            }}
        >
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

// Helper to decode JWT payload (without verification)
function parseJwt(token: string): { userId: string; email: string } | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

//