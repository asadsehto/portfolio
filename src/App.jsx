import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CyberGridShader } from './components/Effects/CyberGridShader';
import { SystemHUD } from './components/UI/SystemHUD';
import { NavigationDock } from './components/UI/NavigationDock';
import { HeroSection } from './components/UI/HeroSection';
import { ProjectCarousel } from './components/Views/ProjectCarousel';
import { IdentityModule } from './components/Views/IdentityModule';
import { TerminalOverlay } from './components/Views/TerminalOverlay';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeView, setView] = useState('HOME');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTerminalOpen) return;
      const views = ['HOME', 'PROJECTS', 'IDENTITY'];
      const currentIndex = views.indexOf(activeView);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % views.length;
        setView(views[nextIndex]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (currentIndex - 1 + views.length) % views.length;
        setView(views[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, isTerminalOpen]);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <CyberGridShader />
        </Canvas>
      </div>

      <div style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 1, overflow: 'hidden' }}>
        <SystemHUD />

        <AnimatePresence mode="wait">
          {activeView === 'HOME' && (
            <motion.div
              key="HOME"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%' }}
            >
              <HeroSection />
            </motion.div>
          )}
          {activeView === 'PROJECTS' && (
            <motion.div
              key="PROJECTS"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              style={{ width: '100%', height: '100%' }}
            >
              <ProjectCarousel />
            </motion.div>
          )}
          {activeView === 'IDENTITY' && (
            <motion.div
              key="IDENTITY"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              style={{ width: '100%', height: '100%' }}
            >
              <IdentityModule />
            </motion.div>
          )}
        </AnimatePresence>

        <NavigationDock
          activeView={activeView}
          setView={setView}
          toggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
          isTerminalOpen={isTerminalOpen}
        />

        <TerminalOverlay searchIsOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      </div>
    </>
  );
}

export default App;
