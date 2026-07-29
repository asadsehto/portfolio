import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

export const IdentityModule = () => {
    const isMobile = useIsMobile();

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            boxSizing: 'border-box',
            padding: isMobile ? '4.5rem 1rem 6rem 1rem' : '5vh 5vw 10vh 5vw',
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : '1fr 1.5fr 1fr',
            gap: isMobile ? '1rem' : '2rem',
            alignContent: 'center',
            overflowY: isMobile ? 'auto' : 'visible'
        }} className={isMobile ? 'hide-scrollbar' : undefined}>
            {/* Background Grid Lines */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.3 }} />

            {/* COL 2: CORE MATRIX (Skills) - shown first on mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', order: isMobile ? -1 : 0 }}>
                <Panel title="NEURAL_MATRIX [SKILLS]" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }} isMobile={isMobile}>
                    {/* Hex Grid Representation */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', maxWidth: '300px' }}>
                        {['PYTHON', 'AI', 'REACT', 'NODE', 'SQL', 'JAVA', 'GO', 'DOCKER', 'LINUX'].map((tech, i) => (
                            <motion.div
                                key={tech}
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}
                                style={{
                                    width: isMobile ? '70px' : '80px', height: isMobile ? '62px' : '70px',
                                    background: 'rgba(0, 255, 255, 0.05)',
                                    border: '1px solid var(--color-primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                    color: '#fff',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold',
                                    cursor: 'default'
                                }}
                                whileHover={{ background: 'var(--color-primary)', color: '#000', scale: 1.1 }}
                                whileTap={{ background: 'var(--color-primary)', color: '#000', scale: 1.1 }}
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </div>
                </Panel>
            </div>

            {/* COL 1: SYSTEM LOGS (Experience) */}
            <Panel title="SYSTEM_LOGS [XP]" isMobile={isMobile}>
                <LogEntry year="2024" type="ACTIVE" msg="FREELANCE_SERVICES_ONLINE" sub="Upwork // Global Deployment" />
                <LogEntry year="2023" type="INIT" msg="ACADEMIC_INITIALIZATION" sub="Sukkur IBA // AI Research" />
                <div style={{ marginTop: isMobile ? '0.5rem' : 'auto', borderTop: '1px dashed #333', paddingTop: '1rem', color: '#666', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    &gt; TOTAL_RUNTIME: 30,000 HRS<br />
                    &gt; OPTIMIZATION: 99.9%
                </div>
            </Panel>

            {/* COL 3: UPLINKS (Socials) */}
            <Panel title="NETWORK_STATUS" isMobile={isMobile}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', justifyContent: 'center' }}>
                    <StatusLink name="GITHUB" status="ONLINE" ping="24ms" link="https://github.com/asadsehto" />
                    <StatusLink name="LINKEDIN" status="CONNECTED" ping="12ms" link="https://linkedin.com/in/asadsaleemsahto" />
                    <StatusLink name="KAGGLE" status="ACTIVE" ping="45ms" link="https://www.kaggle.com/asadsahto" />
                </div>
            </Panel>

        </div>
    );
};

const Panel = ({ title, children, style, isMobile }) => (
    <div style={{
        border: '1px solid #333',
        background: 'rgba(5, 5, 10, 0.8)',
        backdropFilter: 'blur(5px)',
        padding: isMobile ? '1.1rem' : '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        ...style
    }}>
        <div style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '1rem', fontFamily: 'monospace', color: '#888', letterSpacing: '2px', fontSize: '0.8rem' }}>
            // {title}
        </div>
        {children}
    </div>
);

const LogEntry = ({ year, type, msg, sub }) => (
    <div style={{ marginBottom: '1.5rem', fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', marginBottom: '5px' }}>
            <span style={{ color: '#666' }}>[{year}]</span>
            <span style={{ color: type === 'ACTIVE' ? '#0f0' : 'var(--color-primary)' }}>{type}</span>
        </div>
        <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>{msg}</div>
        <div style={{ color: '#888', fontSize: '0.8rem', paddingLeft: '10px', borderLeft: '1px solid #333', marginTop: '5px' }}>{sub}</div>
    </div>
);

const StatusLink = ({ name, status, ping, link }) => (
    <a href={link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
        <div>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>{name}</div>
            <div style={{ color: '#444', fontSize: '0.7rem' }}>PING: {ping}</div>
        </div>
        <div style={{ color: '#0f0', fontSize: '0.8rem', fontFamily: 'monospace' }}>● {status}</div>
    </a>
)
