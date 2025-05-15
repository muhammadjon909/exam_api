import { useEffect, useState } from 'react';

export interface Profile {
  id: number;
  full_name?: string;
  gender?: string;
  birth_date?: string;
  email?: string;
  phone_number?: string;
  role?: string;
  face_id?: string;
  company_id?: string;
  avatar?: string;
  salary_type?: string;
  balance?: number;
  inn?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/api/v1/accounts/me/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Profilni olishda xatolik');
        }
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Nomalum xatolik');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return { profile, loading, error };
} 