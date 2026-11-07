import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import FestiveDecorations from './components/FestiveDecorations';
import FireworksCanvas from './components/FireworksCanvas';
import HeroSection from './components/HeroSection';
import VisitorForm from './components/VisitorForm';
import PersonalizedWishModal from './components/PersonalizedWishModal';
import Footer from './components/Footer';

// Lazy load AdminPortal so public landing page loads instantly without Firebase overhead
const AdminPortal = lazy(() => import('./components/AdminPortal'));

export default function App() {
  const [visitorName, setVisitorName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  const handleContinue = (name) => {
    setVisitorName(name);
    setIsModalOpen(true);
  };

  const handleDiyaCenterClick = () => {
    // When visitor taps central Diya, gently scroll down to the personalized wish section
    const formSection = document.getElementById('visitor-name-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Global shortcut: Ctrl + Shift + A to open Admin Portal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminPortalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background Interactive Fireworks & Embers Canvas */}
      <FireworksCanvas />

      {/* Traditional Indian Festive Accents: Toran, Kandils, Mandalas */}
      <FestiveDecorations />

      {/* Top Navigation with Admin Portal Access */}
      <Navbar onOpenAdmin={() => setIsAdminPortalOpen(true)} />

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        {/* 1. Hero Section & Intro from Ankur (with Golden Portrait) */}
        <HeroSection onDiyaClick={handleDiyaCenterClick} />

        {/* 2. Visitor Name & Continue Button Section */}
        <VisitorForm onContinue={handleContinue} />
      </main>

      {/* 3. Personalized Greeting Modal Reveal with Replay & Edit */}
      {isModalOpen && (
        <PersonalizedWishModal
          visitorName={visitorName}
          onClose={() => setIsModalOpen(false)}
          onUpdateName={(newName) => setVisitorName(newName)}
        />
      )}

      {/* 4. Firebase Google Admin Authentication Portal (Lazy loaded) */}
      {isAdminPortalOpen && (
        <Suspense fallback={null}>
          <AdminPortal
            isOpen={isAdminPortalOpen}
            onClose={() => setIsAdminPortalOpen(false)}
          />
        </Suspense>
      )}

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminPortalOpen(true)} />
    </div>
  );
}
