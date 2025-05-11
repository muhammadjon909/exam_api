import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Clients from './pages/Clients';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Simeniyalar from './pages/Simeniyalar';

import './styles/app.css';

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/xodimlar" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Employees />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/mijozlar" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Clients />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/simeniyalar" element={<Simeniyalar />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;