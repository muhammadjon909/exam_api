import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const Smenalar = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setBranchId] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [branchesLoading, setBranchesLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newShift, setNewShift] = useState({ name: '', date: '' });
  const navigate = useNavigate();

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

  const handleNewShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewShift({ ...newShift, [e.target.name]: e.target.value });
  };

  const handleNewShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    setNewShift({ name: '', date: '' });
    alert("Yangi smena qo'shildi!");
  };

  return (
    <div className="smenalar-page" style={{padding:'32px 0 32px 0', position:'relative'}}>
      <div style={{display:'flex',alignItems:'center',marginBottom:'2.5rem',paddingLeft:'48px'}}>
        <h1 style={{fontSize:'2.5rem',fontWeight:800,color:'#ff9c4a',letterSpacing:'0.5px',marginBottom:'0'}}>Smenalar</h1>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',marginBottom:'2.5rem',paddingLeft:'48px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'2.2rem'}}>
          <label htmlFor="branch" style={{color:'#ffb97a',fontWeight:600,fontSize:'1.25rem'}}>Filial tanlang:</label>
          {branchesLoading ? (
            <span style={{color:'#ffb97a',fontSize:'1.1rem'}}>Filiallar yuklanmoqda...</span>
          ) : (
            <select
              id="branch"
              value={branchId ?? ''}
              onChange={e => setBranchId(Number(e.target.value))}
              style={{
                padding: '0.8rem 2.2rem',
                borderRadius: '10px',
                border: '2px solid #ff9c4a',
                background: '#181c23',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.15rem',
                minWidth: '220px',
                outline: 'none',
                boxShadow: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                marginBottom: 0
              }}
            >
              {branches.map(branch => (
                <option key={branch.id} value={branch.id} style={{background:'#181c23',color:'#fff',fontWeight:600}}>{branch.name}</option>
              ))}
            </select>
          )}
        </div>
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
        <div style={{overflowX:'auto',background:'#23242a',borderRadius:'16px',boxShadow:'0 4px 32px 0 rgba(255,122,26,0.04)',padding:'1.5rem 1rem'}}>
          <table className="data-table" style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#181c23'}}>
                <th style={{color:'#ffb97a',fontWeight:700,padding:'0.7rem',fontSize:'1rem'}}>F.I.O</th>
                <th style={{color:'#ffb97a',fontWeight:700,padding:'0.7rem',fontSize:'1rem'}}>Telefon raqami</th>
                <th style={{color:'#ffb97a',fontWeight:700,padding:'0.7rem',fontSize:'1rem'}}>Lavozim</th>
                <th style={{color:'#ffb97a',fontWeight:700,padding:'0.7rem',fontSize:'1rem'}}>Tug'ilgan sana</th>
                <th style={{color:'#ffb97a',fontWeight:700,padding:'0.7rem',fontSize:'1rem'}}>Maosh</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} style={{borderBottom:'1px solid #23242a',background:'none'}}>
                  <td style={{color:'#fff',padding:'0.7rem',fontWeight:500}}>{emp.user?.full_name}</td>
                  <td style={{color:'#fff',padding:'0.7rem',fontWeight:500}}>{emp.user?.phone_number}</td>
                  <td style={{color:'#ff9c4a',padding:'0.7rem',fontWeight:600}}>{emp.position || emp.user_role}</td>
                  <td style={{color:'#fff',padding:'0.7rem',fontWeight:500}}>{emp.user?.birth_date}</td>
                  <td style={{color:'#fff',padding:'0.7rem',fontWeight:500}}>{emp.official_salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {employees.length === 0 && <div style={{color:'#ffb97a',textAlign:'center',padding:'1.5rem 0'}}>Xodimlar topilmadi</div>}
        </div>
      )}
      {modalOpen && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.45)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#23242a',borderRadius:'18px',boxShadow:'0 8px 32px 0 rgba(255,156,74,0.18)',padding:'2.2rem 2rem 2rem 2rem',minWidth:320,maxWidth:400,position:'relative'}}>
            <button onClick={()=>setModalOpen(false)} style={{position:'absolute',top:12,right:16,fontSize:'1.7rem',background:'none',border:'none',color:'#ff9c4a',cursor:'pointer',fontWeight:700}}>&times;</button>
            <h2 style={{color:'#ff9c4a',marginBottom:'1.2rem',fontWeight:700,fontSize:'1.3rem'}}>Yangi smena qo'shish</h2>
            <form onSubmit={handleNewShiftSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem',minWidth:260}}>
              <div>
                <label style={{color:'#ffb97a',fontWeight:500}}>Smena nomi</label>
                <input name="name" type="text" value={newShift.name} onChange={handleNewShiftChange} required placeholder="Smena nomi" style={{width:'100%',padding:'0.6rem',borderRadius:'7px',border:'1px solid #444',background:'#181c23',color:'#fff',marginTop:'4px'}} />
              </div>
              <div>
                <label style={{color:'#ffb97a',fontWeight:500}}>Sana</label>
                <input name="date" type="date" value={newShift.date} onChange={handleNewShiftChange} required style={{width:'100%',padding:'0.6rem',borderRadius:'7px',border:'1px solid #444',background:'#181c23',color:'#fff',marginTop:'4px'}} />
              </div>
              <button type="submit" style={{background:'#ff9c4a',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem',fontWeight:600,fontSize:'1rem',cursor:'pointer',marginTop:'0.5rem'}}>Qo'shish</button>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => navigate(-1)}
        style={{
          position:'fixed',
          bottom:'32px',
          left:'48px',
          background:'#23242a',
          border:'2px solid #ff9c4a',
          color:'#ff9c4a',
          borderRadius:'8px',
          padding:'0.55rem 1.2rem 0.55rem 1.1rem',
          fontWeight:600,
          fontSize:'1rem',
          display:'flex',
          alignItems:'center',
          gap:'0.5rem',
          cursor:'pointer',
          transition:'background 0.2s',
          boxShadow:'0 2px 8px 0 rgba(255,156,74,0.06)',
          zIndex:1100
        }}
        onMouseOver={e => (e.currentTarget.style.background='#181c23')}
        onMouseOut={e => (e.currentTarget.style.background='#23242a')}
      >
        <span style={{fontSize:'1.2em',lineHeight:1,display:'inline-block',transform:'translateY(1px)'}}>&larr;</span> Ortga qaytish
      </button>
    </div>
  );
};

export default Smenalar; 