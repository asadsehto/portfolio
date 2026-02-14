import { projects } from '../../data/projects';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const RepoCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const baseColor = 'var(--color-primary)';

    const onHover = () => {
        gsap.to(cardRef.current, {
            y: -5,
            borderColor: baseColor,
            boxShadow: `0 10px 20px -10px ${baseColor}`,
            duration: 0.3
        });
        gsap.to(cardRef.current.querySelector('.glitch-overlay'), { opacity: 0.1, duration: 0.1 });
    };

    const onLeave = () => {
        gsap.to(cardRef.current, {
            y: 0,
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'none',
            duration: 0.3
        });
        gsap.to(cardRef.current.querySelector('.glitch-overlay'), { opacity: 0, duration: 0.1 });
    };

    return (
        <a
            href={project.link}
            target="_blank"
            ref={cardRef}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(10, 10, 15, 0.4)',
                border: '1px solid var(--color-glass-border)',
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'var(--color-text)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '180px',
                transition: 'background 0.3s'
            }}
        >
            <div className="glitch-overlay" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ffff 3px)',
                opacity: 0, pointerEvents: 'none'
            }} />

            <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#fff', letterSpacing: '1px' }}>
                {project.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#888', flex: 1 }}>{project.description}</p>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {project.tech.map(t => (
                    <span key={t} style={{ fontSize: '0.65rem', color: baseColor }}>//{t}</span>
                ))}
            </div>
        </a>
    );
};

const ProfileBadge = ({ project }) => {
    const badgeRef = useRef(null);

    return (
        <a
            href={project.link}
            target="_blank"
            ref={badgeRef}
            onMouseEnter={() => gsap.to(badgeRef.current, { scale: 1.1, filter: 'brightness(1.5)', duration: 0.2 })}
            onMouseLeave={() => gsap.to(badgeRef.current, { scale: 1, filter: 'brightness(1)', duration: 0.2 })}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'linear-gradient(90deg, #1a1a1a, #000)',
                border: '1px solid #333',
                borderLeft: '4px solid #ffcc00', // Gold accent
                padding: '1rem 2rem',
                textDecoration: 'none',
                color: '#fff',
                minWidth: '250px'
            }}
        >
            <div style={{ fontSize: '2rem', color: '#ffcc00' }}>★</div>
            <div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>EXTERNAL PROFILE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{project.title.replace(' Profile', '')}</div>
            </div>
        </a>
    )
}

export const ProjectDeck = () => {
    const repos = projects.filter(p => p.type === 'repo');
    const profiles = projects.filter(p => p.type === 'profile');

    return (
        <section style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            zIndex: 5,
            position: 'relative'
        }}>
            {/* Repos Grid */}
            <div style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '0.9rem', color: '#555', marginBottom: '2rem', letterSpacing: '2px' }}>
                    // REPOSITORY_DATABASE
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {repos.map((p, i) => (
                        <RepoCard key={p.id} project={p} index={i} />
                    ))}
                </div>
            </div>

            {/* Profiles Section (Distinct) */}
            <div style={{
                borderTop: '1px solid #222',
                paddingTop: '3rem',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <h2 style={{ fontSize: '0.9rem', color: '#ffcc00', marginBottom: '2rem', letterSpacing: '4px' }}>
                    :: IDENTITY_MODULES ::
                </h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {profiles.map(p => (
                        <ProfileBadge key={p.id} project={p} />
                    ))}
                    {/* Placeholder for future profiles */}
                    <div style={{
                        border: '1px dashed #333',
                        padding: '1rem 2rem',
                        color: '#444',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.8rem'
                    }}>
                        + CONNECT NEW MODULE
                    </div>
                </div>
            </div>
        </section>
    );
};
