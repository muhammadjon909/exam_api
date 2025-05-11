import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Users2, Building2, CalendarDays, BarChart3, Settings2, Layers3, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [active, setActive] = useState('/');

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <aside className="sidebar" data-aos="fade-right" data-aos-duration="500">
      <div className="logo-container">
        <Link to="/" className="logo">
          <Layers3 className="logo-icon" size={36} color="#ff7a1a" />
          <span className="logo-text" style={{fontSize:'1.6rem',fontWeight:700,marginLeft:'0.8rem'}}>Noventer</span>
        </Link>
      </div>
      
      <nav className="nav-menu">
        <ul>
          <li className={active === '/' ? 'active' : ''}>
            <Link to="/">
              <Home className="nav-icon" size={26} />
              <span>Asosiy sahifa</span>
            </Link>
          </li>
          <li className={active === '/xodimlar' ? 'active' : ''}>
            <Link to="/xodimlar">
              <Users2 className="nav-icon" size={26} />
              <span>Xodimlar ro'yxati</span>
            </Link>
          </li>
          <li className={active === '/mijozlar' ? 'active' : ''}>
            <Link to="/mijozlar">
              <Building2 className="nav-icon" size={26} />
              <span>Mijozlar</span>
            </Link>
          </li>
          <li className={active === '/simeniyalar' ? 'active' : ''}>
            <Link to="/simeniyalar">
              <Layers3 className="nav-icon" size={26} />
              <span>Smenalar</span>
            </Link>
          </li>
          <li className={active === '/takliflar' ? 'active' : ''}>
            <Link to="/takliflar">
              <CalendarDays className="nav-icon" size={26} />
              <span>Takliflar</span>
            </Link>
          </li>
          <li className={active === '/xisobot' ? 'active' : ''}>
            <Link to="/xisobot">
              <BarChart3 className="nav-icon" size={26} />
              <span>Xisobot</span>
            </Link>
          </li>
          <li className={active === '/sozlamalar' ? 'active' : ''}>
            <Link to="/sozlamalar">
              <Settings2 className="nav-icon" size={26} />
              <span>Sozlamalar</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-button" onClick={logout} style={{fontSize:'1.15rem',padding:'1.1rem 0'}}>
          <LogOut className="nav-icon" size={24} />
          <span>Chiqish</span>
        </button>
        <div className="footer-text">
          <small>crm.noventer platformasi Noventer jamoa tomonidan yaratildi | 2025 © Noventer</small>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;