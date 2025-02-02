"use client";

import { useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AuthError | null>(null);

    useEffect(() => {
        // Verificar sessão atual
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Escutar mudanças de autenticação
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err as AuthError };
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err as AuthError };
        }
    };

    const signInWithMagicLink = async (email: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
            });
            if (error) throw error;
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err as AuthError };
        }
    };

    const signInWithProvider = async (provider: 'google' | 'github') => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
            });
            if (error) throw error;
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err as AuthError };
        }
    };

    const resetPassword = async (email: string) => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) throw error;
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err as AuthError };
        }
    };

    const updateUser = async (updates: {
        email?: string;
        password?: string;
        data?: Record<string, any>;
    }) => {
        try {
            const { data, error } = await supabase.auth.updateUser(updates);
            if (error) throw error;
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err as AuthError };
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { error: null };
        } catch (err) {
            return { error: err as AuthError };
        }
    };

    return {
        user,
        loading,
        error,
        signUp,
        signIn,
        signInWithMagicLink,
        signInWithProvider,
        resetPassword,
        updateUser,
        signOut,
    };
}
