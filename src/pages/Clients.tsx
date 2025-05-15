import { useEffect, useState, useRef } from 'react';
import DataTable from '../components/DataTable';
import { TableData } from '../types';

const Clients = () => {
  const [clientsData, setClientsData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    branch: '',
    name: '',
    phone: '',
    avatar: null as File | null,
    license_file: null as File | null,
  });
  const [formLoading, setFormLoading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const licenseInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://api.noventer.uz/api/v1/company/clients/?limit=100', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        const mapped = (data.results || []).map((client: any) => ({
          id: String(client.id),
          avatar: client.avatar
            ? <img src={client.avatar} alt={client.name} style={{width: 36, height: 36, borderRadius: '50%', objectFit: 'cover'}} />
            : (client.name ? client.name.charAt(0) : 'C'),
          name: client.name,
          phone: client.phone,
          role: client.branch_name,
          date: client.created_at ? client.created_at.split('T')[0] : '',
          time: client.created_at ? client.created_at.split('T')[1]?.slice(0,5) : ''
        }));
        setClientsData(mapped);
      } else {
        setClientsData([]);
      }
    } catch (error) {
      setClientsData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('branch', form.branch);
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      if (form.avatar) formData.append('avatar', form.avatar);
      if (form.license_file) formData.append('license_file', form.license_file);
      const response = await fetch('https://api.noventer.uz/api/v1/company/clients/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
        body: formData,
      });
      if (response.ok) {
        setModalOpen(false);
        setForm({ branch: '', name: '', phone: '', avatar: null, license_file: null });
        if (avatarInputRef.current) avatarInputRef.current.value = '';
        if (licenseInputRef.current) licenseInputRef.current.value = '';
        fetchClients();
      } else {
        alert('Mijozni qo‘shishda xatolik!');
      }
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-bounce">
          <div className="loading-bounce-dot"></div>
          <div className="loading-bounce-dot"></div>
          <div className="loading-bounce-dot"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="clients-page">
      <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', marginBottom:'1.5rem'}}>
        <button 
          onClick={() => setModalOpen(true)} 
          style={{
            padding:'0.6rem 1.2rem',
            borderRadius:'8px',
            background:'#ff9c4a',
            color:'#fff',
            fontWeight:600,
            border:'none',
            fontSize:'1rem',
            cursor:'pointer',
            boxShadow:'0 2px 8px 0 rgba(255,156,74,0.08)'
          }}
        >
          + Mijoz qo‘shish
        </button>
      </div>
      <DataTable title="Mijozlar ro'yxati" data={clientsData} />
      {modalOpen && (
        <div className="modal-overlay" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.45)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:0}}>
          <div className="modal" style={{background:'#23242a',borderRadius:'18px',boxShadow:'0 8px 32px 0 rgba(255,156,74,0.18)',padding:'2.2rem 2rem 2rem 2rem',minWidth:340,maxWidth:400,position:'relative'}}>
            <button className="modal-close" onClick={() => setModalOpen(false)} style={{position:'absolute',top:12,right:16,fontSize:'1.7rem',background:'none',border:'none',color:'#ff9c4a',cursor:'pointer',fontWeight:700}}>&times;</button>
            <h2 style={{color:'#ff9c4a',marginBottom:'1.2rem',fontWeight:700,fontSize:'1.3rem'}}>Yangi mijoz qoshish</h2>
            <form onSubmit={handleFormSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem',minWidth:320}}>
              <div>
                <label style={{color:'#ffb97a',fontWeight:500}}>Filial ID (branch)</label>
                <input name="branch" type="number" value={form.branch} onChange={handleFormChange} required placeholder="Filial ID" style={{width:'100%',padding:'0.6rem',borderRadius:'7px',border:'1px solid #444',background:'#181c23',color:'#fff',marginTop:'4px'}} />
              </div>
              <div>
                <label style={{color:'#ffb97a',fontWeight:500}}>Ism (name)</label>
                <input name="name" type="text" value={form.name} onChange={handleFormChange} required placeholder="Ism" style={{width:'100%',padding:'0.6rem',borderRadius:'7px',border:'1px solid #444',background:'#181c23',color:'#fff',marginTop:'4px'}} />
              </div>
              <div>
                <label style={{color:'#ffb97a',fontWeight:500}}>Telefon (phone)</label>
                <input name="phone" type="text" value={form.phone} onChange={handleFormChange} required placeholder="Telefon raqam" style={{width:'100%',padding:'0.6rem',borderRadius:'7px',border:'1px solid #444',background:'#181c23',color:'#fff',marginTop:'4px'}} />
              </div>
              <div>
                <label style={{color:'#ffb97a',fontWeight:500}}>Avatar (rasm)</label>
                <input name="avatar" type="file" accept="image/*" ref={avatarInputRef} onChange={handleFormChange} style={{marginTop:'4px'}} />
              </div>
              <div>
                <label style={{color:'#ffb97a',fontWeight:500}}>License file (fayl)</label>
                <input name="license_file" type="file" accept="image/*,application/pdf" ref={licenseInputRef} onChange={handleFormChange} style={{marginTop:'4px'}} />
              </div>
              <button type="submit" disabled={formLoading} style={{background:'#ff9c4a',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem',fontWeight:600,fontSize:'1rem',cursor:'pointer',marginTop:'0.5rem'}}>
                {formLoading ? 'Yuklanmoqda...' : 'Qoshish'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;