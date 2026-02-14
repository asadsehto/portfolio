import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CyberGridShader } from './components/Effects/CyberGridShader';
import { SystemHUD } from './components/UI/SystemHUD';
import { HeroSection } from './components/UI/HeroSection';
import { ProjectCarousel } from './components/Views/ProjectCarousel';
import { IdentityModule } from './components/Views/IdentityModule';
import { NavigationDock } from './components/UI/NavigationDock';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeView, setView] = useState('HERO');

  return (
    <>
      {/* Background Layer (Fixed) */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <CyberGridShader />
        </Canvas>
      </div>

      {/* Foreground UI Layer (Fixed Window) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>

        <div className="scanline" />
        <SystemHUD />

        {/* Content Area */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {activeView === 'HERO' && (
              <motion.div
                key="HERO"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100%' }}
              >
                <HeroSection />
              </motion.div>
            )}

            {activeView === 'PROJECTS' && (
              <motion.div
                key="PROJECTS"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: '100%', height: '100%' }}
              >
                <ProjectCarousel />
              </motion.div>
            )}

            {activeView === 'IDENTITY' && (
              <motion.div
                key="IDENTITY"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: '100%', height: '100%' }}
              >
                <IdentityModule />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Dock */}
        <NavigationDock activeView={activeView} setView={setView} />
      </div>
    </>
  );
}

export default App;
