import { useEffect, useState } from 'react';

interface Branch {
  id: number;
  name: string;
}

interface Shift {
  id: number;
  name: string;
  branch: number;
  branch_name: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

const FieldEmployees = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setBranchId] = useState<number | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(false);
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

  // Tanlangan filial uchun smenalarni olish
  useEffect(() => {
    if (!branchId) return;
    const fetchShifts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://api.noventer.uz/api/v1/company/shifts/${branchId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setShifts(Array.isArray(data) ? data : []);
        } else {
          setShifts([]);
        }
      } catch (error) {
        setShifts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchShifts();
  }, [branchId]);

  return (
    <div className="field-employees-page">
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
          <div className="loading-spinner"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Filial nomi</th>
              <th>Smena nomi</th>
              <th>Boshlanish vaqti</th>
              <th>Tugash vaqti</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map(shift => (
              <tr key={shift.id}>
                <td>{shift.id}</td>
                <td>{shift.branch_name}</td>
                <td>{shift.name}</td>
                <td>{shift.start_time}</td>
                <td>{shift.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FieldEmployees; 