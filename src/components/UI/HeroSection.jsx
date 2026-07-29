import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

export const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        // Force visibility true after a tiny delay to ensure mount is stable
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    // The Redaction Bar Effect
    const RedactedText = ({ children, primary }) => (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <motion.span
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: 0.4 } }
                }}
                style={{
                    color: primary ? 'var(--color-primary)' : '#fff',
                    fontSize: primary ? (isMobile ? '1rem' : '1.2rem') : (isMobile ? '1.4rem' : '2rem'),
                    fontWeight: primary ? 'normal' : 'bold'
                }}
            >
                {children}
            </motion.span>
            <motion.div
                initial={{ scaleX: 1 }}
                animate={isVisible ? { scaleX: 0 } : { scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: '#fff', zIndex: 2, transformOrigin: 'left'
                }}
            />
        </div>
    );

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'monospace',
            padding: isMobile ? '1rem' : 0,
            boxSizing: 'border-box',
            paddingBottom: isMobile ? '5.5rem' : 0
        }}>
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                style={{
                    background: 'rgba(5, 5, 10, 0.85)',
                    border: '1px solid #333',
                    padding: isMobile ? '1.75rem 1.25rem' : '4rem',
                    maxWidth: '800px',
                    width: isMobile ? '100%' : '90%',
                    maxHeight: isMobile ? '100%' : 'none',
                    overflowY: isMobile ? 'auto' : 'visible',
                    position: 'relative',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 50px rgba(0,0,0,0.8)'
                }}
                className="hide-scrollbar"
            >
                {/* Header Stamps */}
                <motion.div
                    initial={{ opacity: 0, scale: 2, rotate: -20 }}
                    animate={{ opacity: 0.7, scale: 1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.8 }}
                    style={{
                        position: isMobile ? 'static' : 'absolute',
                        top: '1rem', right: '2rem',
                        display: isMobile ? 'inline-block' : 'block',
                        marginBottom: isMobile ? '1rem' : 0,
                        border: '2px solid var(--color-primary)', color: 'var(--color-primary)',
                        padding: '4px 10px', fontWeight: 'bold', fontSize: isMobile ? '0.7rem' : '1rem'
                    }}
                >
                    CONFIDENTIAL
                </motion.div>

                <div style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: isMobile ? '1.25rem' : '2rem', display: 'flex', justifyContent: 'space-between', fontSize: isMobile ? '0.75rem' : '1rem' }}>
                    <span style={{ color: '#666' }}>// PERSONNEL_FILE_01</span>
                    <span style={{ color: '#0f0' }}>● ACTIVE</span>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '150px 1fr',
                    gap: isMobile ? '1rem' : '2rem',
                    alignItems: isMobile ? 'start' : 'center'
                }}>
                    {/* Photo Placeholder */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            width: isMobile ? '90px' : '120px', height: isMobile ? '90px' : '120px',
                            border: '1px solid #444',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#444', background: '#000', fontSize: isMobile ? '0.65rem' : '1rem'
                        }}
                    >
                        [NO_IMAGE]
                    </motion.div>

                    {/* Core Data */}
                    <div>
                        <motion.div variants={itemVariants} style={{ marginBottom: '1rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '2px' : 0 }}>
                            <span style={{ color: '#666', marginRight: isMobile ? 0 : '1rem', width: isMobile ? 'auto' : '80px', fontSize: isMobile ? '0.75rem' : '1rem' }}>SUBJECT:</span>
                            <RedactedText>ASAD SALEEM</RedactedText>
                        </motion.div>
                        <motion.div variants={itemVariants} style={{ marginBottom: '1rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '2px' : 0 }}>
                            <span style={{ color: '#666', marginRight: isMobile ? 0 : '1rem', width: isMobile ? 'auto' : '80px', fontSize: isMobile ? '0.75rem' : '1rem' }}>ROLE:</span>
                            <RedactedText primary>AI ENGINEER & DEVELOPER</RedactedText>
                        </motion.div>
                        <motion.div variants={itemVariants} style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
                            <span style={{ color: '#666', marginRight: '1rem' }}>CLEARANCE:</span>
                            <span style={{ color: '#aaa' }}>LEVEL 5 // SYSTEM ACCESS GRANTED</span>
                        </motion.div>
                    </div>
                </div>

                {/* Divider */}
                <motion.div variants={itemVariants} style={{ width: '100%', height: '1px', background: '#333', margin: isMobile ? '1.25rem 0' : '2rem 0' }} />

                {/* Overview */}
                <motion.div variants={itemVariants}>
                    <h3 style={{ color: '#fff', fontSize: isMobile ? '0.85rem' : '1rem', marginBottom: '1rem' }}>// OVERVIEW_SUMMARY</h3>
                    <p style={{ color: '#ccc', lineHeight: '1.8', maxWidth: '600px', fontSize: isMobile ? '0.85rem' : '1rem' }}>
                        Specialized operative in <strong>Artificial Intelligence</strong> and <strong>Full-Stack Development</strong>.
                        Currently engaged in building advanced neural networks and high-performance web systems.
                        Proven track record in deploying autonomous agents and scalable architectures.
                    </p>
                </motion.div>

                {/* Footer */}
                <motion.div variants={itemVariants} style={{
                    marginTop: isMobile ? '1.5rem' : '3rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: isMobile ? '0.75rem 1.5rem' : '2rem',
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                    color: '#666'
                }}>
                    <span>LOC: PAKISTAN</span>
                    <span>EXP: 3 YEARS</span>
                    <span>STACK: PYTHON, JS, C++</span>
                </motion.div>

            </motion.div>
        </div>
    );
};
