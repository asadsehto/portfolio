import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';

export const ProjectCarousel = () => {
    // Filter out profile if needed, or keep it.
    const displayProjects = projects.filter(p => p.type !== 'profile');
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            padding: '5vh 5vw',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            {/* LEFT: MASTER LIST (Grid of Folders) */}
            <div style={{
                width: '35%',
                height: '70vh',
                overflowY: 'auto',
                paddingRight: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '1rem',
                alignContent: 'start'
            }} className="hide-scrollbar">

                <h3 style={{ gridColumn: '1/-1', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-primary)', paddingBottom: '5px', marginBottom: '10px' }}>
                    CASE_DIRECTORY
                </h3>

                {displayProjects.map((p, i) => (
                    <motion.div
                        key={p.id}
                        onMouseEnter={() => setActiveIndex(i)}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 255, 0.1)' }}
                        style={{
                            border: activeIndex === i ? '1px solid var(--color-primary)' : '1px solid #333',
                            background: activeIndex === i ? 'rgba(0, 255, 255, 0.05)' : 'rgba(0,0,0,0.5)',
                            padding: '1rem',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {/* Folder Icon / Tab */}
                        <div style={{ width: '30px', height: '10px', background: activeIndex === i ? 'var(--color-primary)' : '#444', borderRadius: '2px 2px 0 0', marginBottom: '-5px' }} />
                        <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {p.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'monospace' }}>
                            {p.id.toUpperCase()}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* RIGHT: DETAIL VIEW (The Card) */}
            <div style={{ width: '60%', height: '70vh', position: 'relative' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            background: 'rgba(10, 15, 20, 0.95)',
                            border: '1px solid #333',
                            borderTop: '4px solid var(--color-primary)',
                            padding: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 0 50px rgba(0,0,0,0.8)',
                            position: 'relative'
                        }}
                    >
                        {/* Card Content from previous step */}
                        <div style={{
                            position: 'absolute', top: '2rem', right: '2rem',
                            border: '3px solid rgba(255, 0, 0, 0.5)', color: 'rgba(255, 0, 0, 0.5)',
                            padding: '5px 15px', fontSize: '1.5rem', fontWeight: 'bold',
                            transform: 'rotate(-10deg)', pointerEvents: 'none'
                        }}>
                            TOP SECRET
                        </div>

                        <div style={{ color: '#666', fontFamily: 'monospace', marginBottom: '0.5rem' }}>// ACCESSING_FILE: {displayProjects[activeIndex].id.toUpperCase()}</div>
                        <h1 style={{ fontSize: '3rem', color: '#fff', margin: '0 0 2rem 0', fontFamily: 'var(--font-display)', lineHeight: '1' }}>
                            {displayProjects[activeIndex].title.toUpperCase()}
                        </h1>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flex: 1 }}>
                            <div>
                                <SectionTitle>MISSION STATUS</SectionTitle>
                                <div style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '2rem' }}>
                                    ● {displayProjects[activeIndex].status || 'DEPLOYED'}
                                </div>

                                <SectionTitle>TECH_STACK</SectionTitle>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {displayProjects[activeIndex].tech.map(t => (
                                        <span key={t} style={{ background: '#111', border: '1px solid #333', padding: '5px 10px', fontSize: '0.8rem', color: '#aaa' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <SectionTitle>BRIEFING</SectionTitle>
                                <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.6', flex: 1 }}>
                                    {displayProjects[activeIndex].description}
                                </p>

                                <a
                                    href={displayProjects[activeIndex].link}
                                    target="_blank"
                                    style={{
                                        background: 'var(--color-primary)',
                                        color: '#000',
                                        textDecoration: 'none',
                                        padding: '1rem',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)'
                                    }}
                                >
                                    ACCESS_SOURCE_CODE
                                </a>
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
};

const SectionTitle = ({ children }) => (
    <h3 style={{ color: 'var(--color-primary)', borderBottom: '1px solid #333', paddingBottom: '5px', fontSize: '0.9rem', marginBottom: '1rem' }}>
        {children}
    </h3>
);
