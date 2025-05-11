import { useState } from 'react';
import UserProfile from '../components/UserProfile';
import '../styles/home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="home-container">
      <div className="tab-navigation" data-aos="fade-up" data-aos-duration="400">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'profile' && <UserProfile />}
        {activeTab === 'history' && (
          <div className="history-container" data-aos="fade-up" data-aos-duration="600">
            <h3>Tarix mavjud emas</h3>
            <p>Hozircha tarix ma'lumotlari mavjud emas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;