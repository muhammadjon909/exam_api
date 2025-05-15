import { useEffect, useState } from 'react';

export interface EmployeeUser {
  full_name: string;
  gender: string;
  phone_number: string;
  passport_number: string;
  jshshr: string;
  birth_date: string;
  salary_type: string;
}

export interface Employee {
  id: number;
  user: EmployeeUser;
  user_full_name: string;
  user_role: string;
  branch_id: number;
  department_id: number;
  shift_id: number;
  branch_name: string;
  branch_location: string;
  position: string;
  salary: string;
  official_salary: string;
  start_time: string;
  end_time: string;
}

export interface EmployeesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Employee[];
}

export function useEmployees(params?: { search?: string; limit?: number; offset?: number }) {
  const [data, setData] = useState<EmployeesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const url = new URL('/api/api/v1/eemployee/employees/branch/2/', window.location.origin);
        if (params?.search) url.searchParams.append('search', params.search);
        if (params?.limit) url.searchParams.append('limit', params.limit.toString());
        if (params?.offset) url.searchParams.append('offset', params.offset.toString());
        const res = await fetch(url.toString(), {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Hodimlarni olishda xatolik');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Nomalum xatolik');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [params?.search, params?.limit, params?.offset]);

  return { data, loading, error };
} 