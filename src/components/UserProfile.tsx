// src/components/UserProfile.tsx
import { useProfile } from '../hooks/useProfile';
import '../styles/userProfile.css';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';

const UserProfile = () => {
  const { profile, loading, error } = useProfile();
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <div className="loading-profile">Ma'lumotlar yuklanmoqda...</div>;
  }
  if (error) {
    return <div className="loading-profile">Xatolik: {error}</div>;
  }
  if (!profile) {
    return <div className="loading-profile">Foydalanuvchi ma'lumotlari topilmadi</div>;
  }

  return (
    <div className="profile-main-ui">
      <div className="profile-row">
        <div className="profile-card profile-user-card">
          <div className="profile-user-avatar">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Avatar" />
            ) : (
              <span className="profile-user-initial">{profile.full_name ? profile.full_name.charAt(0) : <FiUser size={40} />}</span>
            )}
          </div>
          <div className="profile-user-info">
            <div className="profile-user-welcome">Xush kelibsiz!</div>
            <div className="profile-user-name-row">
              <div className="profile-user-name">{profile.full_name}</div>
              <button className="profile-edit-btn" onClick={()=>setShowModal(true)}>Tahrirlash</button>
            </div>
            <div className="profile-user-role-badge">{profile.role || 'director'}</div>
          </div>
        </div>
        <div className="profile-card profile-balance-card">
          <div className="profile-balance-title">Finance card</div>
          <div className="profile-balance-id">ID: {profile.id || '0989736'}</div>
          <div className="profile-balance-label">Current balance:</div>
          <div className="profile-balance-amount">{profile.balance !== undefined ? profile.balance + " so'm" : "0 so'm"}</div>
        </div>
      </div>
      <div className="profile-row profile-stats-row">
        <div className="profile-card profile-stat-card">
          <div className="profile-stat-title">Vazifalar</div>
          <div className="profile-stat-value">0</div>
          <div className="profile-stat-desc">Group and individual</div>
        </div>
        <div className="profile-card profile-stat-card">
          <div className="profile-stat-title">Rasmi oylik</div>
          <div className="profile-stat-value">0 so'm</div>
          <div className="profile-stat-desc">1 218 000 so'm</div>
        </div>
        <div className="profile-card profile-stat-card">
          <div className="profile-stat-title">Norasmin oylik</div>
          <div className="profile-stat-value">0 so'm</div>
          <div className="profile-stat-desc">1 218 000 so'm</div>
        </div>
      </div>
      <div className="profile-card profile-info-card">
        <div className="profile-info-title">Ma'lumotlar</div>
        <div className="profile-info-list">
          <div className="profile-info-item"><span>Telefon raqami:</span> <b>{profile.phone_number || 'Mavjud emas'}</b></div>
          <div className="profile-info-item"><span>Email:</span> <b>{profile.email || 'Mavjud emas'}</b></div>
          <div className="profile-info-item"><span>Balans:</span> <b>{profile.balance !== undefined ? profile.balance + " so'm" : 'Mavjud emas'}</b></div>
          <div className="profile-info-item"><span>INN:</span> <b>{profile.inn || 'Mavjud emas'}</b></div>
          <div className="profile-info-item"><span>Jins:</span> <b>{profile.gender || 'Mavjud emas'}</b></div>
          <div className="profile-info-item"><span>Tug'ilgan sana:</span> <b>{profile.birth_date || 'Mavjud emas'}</b></div>
        </div>
      </div>
      {showModal && (
        <div className="profile-modal-backdrop">
          <div className="profile-modal-content">
            <button className="profile-modal-close" onClick={()=>setShowModal(false)}>&times;</button>
            <h2>Profilni tahrirlash</h2>
            <form className="profile-modal-form">
              <label>Ism/Familiya:<input name="full_name" defaultValue={profile.full_name} /></label>
              <label>Jins:<input name="gender" defaultValue={profile.gender} /></label>
              <label>Tug'ilgan sana:<input name="birth_date" defaultValue={profile.birth_date} /></label>
              <label>Email:<input name="email" defaultValue={profile.email} /></label>
              <label>INN:<input name="inn" defaultValue={profile.inn} /></label>
              <button type="submit">Saqlash</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;