import { projects } from '../../data/projects';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const IdentityModule = () => {
    const containerRef = useRef(null);
    const profiles = projects.filter(p => p.type === 'profile');

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <div ref={containerRef} style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {profiles.map(p => (
                    <a
                        key={p.id}
                        href={p.link}
                        target="_blank"
                        style={{
                            width: '400px',
                            minHeight: '250px',
                            background: 'linear-gradient(135deg, #111, #000)',
                            border: '1px solid #333',
                            borderTop: '4px solid #ffcc00',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#fff',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: '10px', right: '10px',
                            fontSize: '0.7rem', color: '#ffcc00', border: '1px solid #ffcc00', padding: '2px 5px'
                        }}>
                            verified_identity
                        </div>

                        <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#ffcc00' }}>
                            ★
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-display)', margin: '0 0 1rem 0', letterSpacing: '2px' }}>
                            KAGGLE
                        </h2>
                        <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem' }}>
                            Data Science & Machine Learning Portfolio<br />
                            Status: <span style={{ color: '#fff' }}>Grandmaster (Aspiring)</span>
                        </p>

                        <div style={{
                            background: '#ffcc00',
                            color: '#000',
                            padding: '10px 30px',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            fontSize: '0.9rem'
                        }}>
                            ACCESS PROFILE
                        </div>
                    </a>
                ))}
            </div>
            <p style={{ marginTop: '3rem', color: '#444', fontFamily: 'monospace' }}>// MORE IDENTITY MODULES OFFLINE</p>
        </div>
    );
};
