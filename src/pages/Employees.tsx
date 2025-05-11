// import DataTable from '../components/DataTable';
// import { TableData } from '../types';
// import { useEmployees } from '../hooks/useEmployees';
import { useEffect, useState } from 'react';

type Branch = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  user: {
    full_name: string;
    phone_number: string;
    birth_date: string;
  };
  user_role?: string;
  position?: string;
  official_salary?: string;
};

const Employees = () => {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setBranchId] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(false);

  // Filiallar ro'yxatini olish
  useEffect(() => {
    const fetchBranches = async () => {
      setBranchesLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api.noventer.uz/api/v1/company/get/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.branches)) {
            setBranches(data.branches);
            if (data.branches.length > 0) setBranchId(data.branches[0].id);
          }
        }
      } finally {
        setBranchesLoading(false);
      }
    };
    fetchBranches();
  }, []);

  // Tanlangan filial uchun xodimlarni olish
  useEffect(() => {
    if (!branchId) return;
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `https://api.noventer.uz/api/v1/employee/employees/branch/${branchId}/`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'accept': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEmployees(data.results || []);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [branchId]);

  return (
    <div className="employees-page">
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label htmlFor="branch">Filial tanlang:</label>
        {branchesLoading ? (
          <span>Filiallar yuklanmoqda...</span>
        ) : (
          <select
            id="branch"
            value={branchId ?? ''}
            onChange={e => setBranchId(Number(e.target.value))}
            style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        )}
      </div>
      {loading ? (
        <div className="profile-loading">
          <div className="loading-bounce">
            <div className="loading-bounce-dot"></div>
            <div className="loading-bounce-dot"></div>
            <div className="loading-bounce-dot"></div>
          </div>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>F.I.O</th>
              <th>Telefon raqami</th>
              <th>Lavozim</th>
              <th>Tug'ilgan sana</th>
              <th>Maosh</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.user?.full_name}</td>
                <td>{emp.user?.phone_number}</td>
                <td>{emp.position || emp.user_role}</td>
                <td>{emp.user?.birth_date}</td>
                <td>{emp.official_salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Employees;