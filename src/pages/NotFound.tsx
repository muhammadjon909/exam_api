import { Ghost, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/notFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-container" data-aos="fade-in" data-aos-duration="1000">
      <div className="not-found-content" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'4rem 2rem'}}>
        <Ghost size={88} color="#ff9c4a" style={{marginBottom:'2rem'}} />
        <div style={{color:'#ffb97a',fontSize:'1.45rem',fontWeight:600,letterSpacing:'0.5px',marginBottom:'2.5rem'}}>Bu sahifa mavjud emas yoki o'chirilgan</div>
        <button
          onClick={() => navigate(-1)}
          style={{
            display:'flex',alignItems:'center',gap:'0.5rem',background:'#23242a',color:'#ff9c4a',border:'2px solid #ff9c4a',borderRadius:'8px',padding:'0.7rem 1.5rem',fontWeight:600,fontSize:'1.08rem',cursor:'pointer',transition:'background 0.2s',boxShadow:'0 2px 8px 0 rgba(255,156,74,0.06)'
          }}
          onMouseOver={e => (e.currentTarget.style.background='#181c23')}
          onMouseOut={e => (e.currentTarget.style.background='#23242a')}
        >
          <ArrowLeft size={20} /> Orqaga qaytish
        </button>
      </div>
    </div>
  );
};

export default NotFound;