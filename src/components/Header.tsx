import { useState } from 'react';
import { FiSearch, FiGrid, FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../styles/header.css';

const Header = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="header" data-aos="fade-down" data-aos-duration="500">
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="header-right">
        <button className="icon-button">
          <FiGrid />
        </button>
        <button className="icon-button">
          <FiBell />
        </button>
        <div className="user-profile">
          <div className="avatar"><FiUser size={24} /></div>
        </div>
      </div>
    </header>
  );
};

export default Header;