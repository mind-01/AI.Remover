import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, STORAGE_BUCKET } from '../lib/supabase';

interface HistoryItem {
    id: string;
    original_url: string;
    processed_url: string;
    task_config: any;
    created_at: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    history: HistoryItem[];
    signOut: () => Promise<void>;
    refreshHistory: () => Promise<void>;
    addToHistory: (item: Omit<HistoryItem, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
    uploadImage: (blob: Blob, path: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        console.log('AuthContext: Initializing...');
        const searchKeys = Array.from(new URLSearchParams(window.location.search).keys());
        const hashParams = new URL(window.location.href.replace('#', '?')).searchParams;
        const hashKeys = Array.from(hashParams.keys());

        console.log('AuthContext: Search Keys:', searchKeys);
        console.log('AuthContext: Hash Keys:', hashKeys);

        if (!supabase) {
            console.warn('AuthContext: Supabase client not initialized');
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
            console.log('AuthContext: getSession result:', session ? `User: ${session.user.email}` : 'No session');
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                console.log('AuthContext: Initial high-priority history fetch');
                fetchHistory(session.user.id);
            }
            setLoading(false);
        }).catch((err: any) => {
            console.error('AuthContext: getSession crash:', err);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: Session | null) => {
            console.log(`AuthContext: Auth Event [${event}]`, session ? `User: ${session.user.email}` : 'No user');
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                fetchHistory(session.user.id);
            } else {
                setHistory([]);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchHistory = async (userId: string) => {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('user_history')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setHistory(data);
        }
    };

    const signOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    const refreshHistory = async () => {
        if (user) await fetchHistory(user.id);
    };

    const addToHistory = async (item: any) => {
        if (!user || !supabase) return;

        const { error } = await supabase.from('user_history').insert([
            { ...item, user_id: user.id }
        ]);

        if (error) {
            console.error('Error adding to history:', error);
            throw error;
        }

        await fetchHistory(user.id);
    };

    const uploadImage = async (blob: Blob, path: string): Promise<string | null> => {
        if (!user || !supabase) return null;

        const fileName = `${user.id}/${Date.now()}-${path}`;
        const { data, error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(fileName, blob, {
                contentType: 'image/png',
                upsert: true
            });

        if (error) {
            console.error('Upload error:', error);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(data.path);

        return publicUrl;
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, history, signOut, refreshHistory, addToHistory, uploadImage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
