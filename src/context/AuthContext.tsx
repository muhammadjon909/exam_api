import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCurrentUser, LoginResponse } from '../context/authService';

interface User extends LoginResponse {
    phone: string;
    name?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            
            if (token && token !== 'undefined' && userData) {
                try {
                    const currentUser = await getCurrentUser();
                    if (currentUser) {
                        const parsedUser = JSON.parse(userData);
                        setIsAuthenticated(true);
                        setUser({
                            ...currentUser,
                            phone: currentUser.phone_number,
                            name: currentUser.first_name 
                                ? `${currentUser.first_name} ${currentUser.last_name || ''}`.trim() 
                                : undefined
                        });
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Auth initialization error:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth konteksdan tashqarida chaqirilmoqda');
    }
    return context;
};