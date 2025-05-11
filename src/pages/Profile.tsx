import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

interface UserProfile {
  id: string;
  full_name: string;
  gender: string;
  birth_date: string;
  email: string;
  role: string;
  face_id: string;
  company_id: string;
  avatar: string;
  salary_type: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://api.noventer.uz/api/v1/accounts/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

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

  if (!profile) {
    return (
      <div className="profile-error">
        <p>Ma'lumotlarni yuklashda xatolik yuz berdi</p>
      </div>
    );
  }

  return (
    <div className="profile-container" data-aos="fade-up" data-aos-duration="600">
      <div className="profile-header">
        <h1>Profil</h1>
      </div>
      <div className="profile-content">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.full_name} />
            ) : (
              <span>{profile.full_name.charAt(0)}</span>
            )}
          </div>
        </div>
        <div className="profile-info">
          <div className="info-group">
            <label>F.I.O</label>
            <p>{profile.full_name}</p>
          </div>
          <div className="info-group">
            <label>Email</label>
            <p>{profile.email}</p>
          </div>
          <div className="info-group">
            <label>Jinsi</label>
            <p>{profile.gender}</p>
          </div>
          <div className="info-group">
            <label>Tug'ilgan sana</label>
            <p>{profile.birth_date}</p>
          </div>
          <div className="info-group">
            <label>Lavozim</label>
            <p>{profile.role}</p>
          </div>
          <div className="info-group">
            <label>Face ID</label>
            <p>{profile.face_id}</p>
          </div>
          <div className="info-group">
            <label>Kompaniya ID</label>
            <p>{profile.company_id}</p>
          </div>
          <div className="info-group">
            <label>Maosh turi</label>
            <p>{profile.salary_type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 