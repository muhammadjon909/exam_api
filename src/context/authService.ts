// src/services/authService.ts

export interface LoginResponse {
    id: number;
    phone_number: string;
    tokens: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    created_at?: string;
    avatar?: string;
    balance?: number;
    inn?: string;
    birthdate?: string;
    gender?: string;
    license?: string;
}

export const loginUser = async (
    phone_number: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const apiUrl = '/api/api/v1/accounts/login/';
        
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                phone_number: phone_number,
                password: password
            }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            
            if (res.status === 401) {
                throw new Error('Telefon raqam yoki parol noto‘g‘ri');
            }
            if (res.status === 400 && errorData.non_field_errors) {
                throw new Error(errorData.non_field_errors.join(', '));
            }
            if (errorData.detail) {
                throw new Error(errorData.detail);
            }
            throw new Error('Login muvaffaqiyatsiz');
        }

        const responseData = await res.json();
        console.log('LOGIN RESPONSE:', responseData);
        // Agar javobda data bo‘lsa, uni ajratib olamiz
        const result = responseData.data ? responseData.data : responseData;
        // Tokenni aniqlash
        let token = null;
        if (result.tokens) {
            if (typeof result.tokens === 'object' && result.tokens.access) {
                token = result.tokens.access;
            } else if (typeof result.tokens === 'string') {
                token = result.tokens;
            }
        } else if (result.token) {
            token = result.token;
        } else if (result.access) {
            token = result.access;
        } else if (result.access_token) {
            token = result.access_token;
        }
        if (!token) {
            throw new Error('Serverdan token qaytmadi. Javob: ' + JSON.stringify(result));
        }
        localStorage.setItem('token', token);
        return { ...result, tokens: token };

    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error('Internet aloqasi yo‘q yoki serverga ulanishda xatolik');
        }
        throw error;
    }
};

export const logoutUser = async (): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            await fetch('/api/api/v1/accounts/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export const getCurrentUser = async (): Promise<LoginResponse | null> => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') return null;

    try {
        const res = await fetch('/api/api/v1/accounts/me/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
};