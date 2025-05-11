// src/hooks/useLogin.ts
import { useState } from 'react';
import { loginUser } from '../context/authService';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async (phone_number: string, password: string) => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(phone_number, password);
            
            // Barcha ma'lumotlarni saqlash
            const userData = {
                id: data.id,
                phone: data.phone_number,
                tokens: data.tokens,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                created_at: data.created_at,
                avatar: data.avatar,
                balance: data.balance,
                inn: data.inn,
                birthdate: data.birthdate,
                gender: data.gender,
                license: data.license
            };

            // Token is already saved in authService, but we save user data here
            localStorage.setItem('user', JSON.stringify(userData));
            
            return userData;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Tizimda xatolik';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};