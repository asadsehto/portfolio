import { motion } from 'framer-motion';

export const IdentityModule = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            padding: '5vh 10vw 10vh 10vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', width: '100%', maxWidth: '1200px' }}>

                {/* LEFT: EXPERIENCE */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 style={{ borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', color: '#fff', marginBottom: '2rem' }}>
                        EXPERIENCE LOG
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <Job
                            role="Freelance Developer"
                            company="Upwork"
                            time="2024 - Present"
                            desc="Building custom solutions for global clients. Optimized Python scrapers, EdTech platforms, and e-commerce architectures."
                        />
                        <Job
                            role="CS Undergraduate"
                            company="Sukkur IBA University"
                            time="2023 - 2027"
                            desc="Focusing on Artificial Intelligence, Deep Learning, and Computer Vision algorithms."
                        />
                    </div>
                </motion.div>

                {/* RIGHT: SKILLS */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 style={{ borderBottom: '2px solid var(--color-secondary)', paddingBottom: '10px', color: '#fff', marginBottom: '2rem' }}>
                        TECHNICAL ARSENAL
                    </h2>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                        {['Python', 'JavaScript', 'React', 'Node.js', 'AI Agents', 'TensorFlow', 'PyTorch', 'Docker'].map(s => (
                            <SkillTag key={s}>{s}</SkillTag>
                        ))}
                        {['C++', 'Java', 'Go', 'SQL', 'MongoDB', 'Git', 'Linux'].map(s => (
                            <SkillTag key={s} secondary>{s}</SkillTag>
                        ))}
                    </div>

                    <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', color: '#aaa', marginBottom: '2rem', fontSize: '1.2rem' }}>
                        NETWORK UPLINKS
                    </h2>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link href="https://github.com/asadsehto">GITHUB</Link>
                        <Link href="https://linkedin.com/in/asadsaleemsahto">LINKEDIN</Link>
                        <Link href="https://www.kaggle.com/asadsahto">KAGGLE</Link>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};

const Job = ({ role, company, time, desc }) => (
    <div style={{ paddingLeft: '20px', borderLeft: '1px solid #333', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '-4px', top: '5px', width: '7px', height: '7px', background: 'var(--color-primary)', borderRadius: '50%' }} />
        <h3 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1.4rem' }}>{role}</h3>
        <div style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '10px' }}>{company} // {time}</div>
        <p style={{ color: '#aaa', margin: 0, lineHeight: '1.6' }}>{desc}</p>
    </div>
);

const SkillTag = ({ children, secondary }) => (
    <span style={{
        padding: '8px 16px',
        background: secondary ? 'rgba(255,255,255,0.05)' : 'rgba(0, 243, 255, 0.1)',
        border: secondary ? '1px solid #333' : '1px solid var(--color-primary)',
        color: secondary ? '#aaa' : '#fff',
        borderRadius: '4px',
        fontSize: '0.9rem'
    }}>
        {children}
    </span>
);

const Link = ({ href, children }) => (
    <a href={href} target="_blank" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid var(--color-primary)', paddingBottom: '2px' }}>
        {children}
    </a>
)
