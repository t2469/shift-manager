    'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
}

interface DecodedToken {
    user_id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
});

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded: DecodedToken = jwtDecode(storedToken);
                setUser({ id: decoded.user_id, name: decoded.name, email: decoded.email });
                setToken(storedToken);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        try {
            const decoded: DecodedToken = jwtDecode(newToken);
            setUser({ id: decoded.user_id, name: decoded.name, email: decoded.email });
            setToken(newToken);
        } catch (error) {
            console.error('Invalid token:', error);
            setUser(null);
            setToken(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        router.push('/login/administrator');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
