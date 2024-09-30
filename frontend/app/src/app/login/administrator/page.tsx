// src/app/login/administrator/page.tsx

'use client';

import { useState, useContext } from 'react';
import api from '../../utils/api'; // 修正後のパス
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';

interface LoginResponse {
    token: string;
    administrator: {
        id: number;
        name: string;
        email: string;
    };
}

export default function AdministratorLoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post<LoginResponse>('/login/administrator', {
                email,
                password,
            });

            const { token, administrator } = response.data;

            // トークンとユーザー情報をAuthContextに保存
            login(token);

            // 管理者ダッシュボードにリダイレクト
            router.push('/administrator/dashboard');
        } catch (err) {
            setError('ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。');
            console.error('Login error:', err);
        }
    };

    return (
        <div>
            <h1>管理者ログイン</h1>
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>ログイン</button>
            </form>
        </div>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    field: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0070f3',
        color: '#fff',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};
