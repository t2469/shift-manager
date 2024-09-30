import { ReactNode } from 'react';

interface LoginLayoutProps {
    children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2>Shift Manager ログイン</h2>
            </header>
            <main style={styles.main}>{children}</main>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    header: {
        marginBottom: '20px',
    },
    main: {
        width: '300px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
};
