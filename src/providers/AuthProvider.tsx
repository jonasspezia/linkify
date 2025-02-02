"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: AuthError | null;
    signUp: (email: string, password: string) => Promise<{
        data: any;
        error: AuthError | null;
    }>;
    signIn: (email: string, password: string) => Promise<{
        data: any;
        error: AuthError | null;
    }>;
    signInWithMagicLink: (email: string) => Promise<{
        data: any;
        error: AuthError | null;
    }>;
    signInWithProvider: (provider: 'google' | 'github') => Promise<{
        data: any;
        error: AuthError | null;
    }>;
    resetPassword: (email: string) => Promise<{
        data: any;
        error: AuthError | null;
    }>;
    updateUser: (updates: {
        email?: string;
        password?: string;
        data?: Record<string, any>;
    }) => Promise<{
        data: any;
        error: AuthError | null;
    }>;
    signOut: () => Promise<{
        error: AuthError | null;
    }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
