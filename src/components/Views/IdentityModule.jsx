import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export const IdentityModule = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);

    const sections = [
        { id: 'cover', content: <CoverSection /> },
        { id: 'bio', content: <BioSection /> },
        { id: 'exp', content: <ExpSection /> },
        { id: 'skills', content: <SkillsSection /> },
        { id: 'contact', content: <ContactSection /> },
    ];

    useEffect(() => {
        const handleWheel = (e) => {
            if (isAnimating) return;

            if (e.deltaY > 0 && currentIndex < sections.length - 1) {
                // Scroll Down -> Next
                goToSection(currentIndex + 1);
            } else if (e.deltaY < 0 && currentIndex > 0) {
                // Scroll Up -> Prev
                goToSection(currentIndex - 1);
            }
        };

        const goToSection = (index) => {
            setIsAnimating(true);

            const direction = index > currentIndex ? 1 : -1;
            const currentSlide = containerRef.current.children[currentIndex];
            const nextSlide = containerRef.current.children[index];

            // Animate Current Slide OUT
            gsap.to(currentSlide, {
                y: direction * -100 + '%',
                opacity: 0,
                filter: 'blur(10px)',
                duration: 0.8,
                ease: "power3.inOut"
            });

            // Animate Next Slide IN
            gsap.fromTo(nextSlide,
                { y: direction * 100 + '%', opacity: 0, filter: 'blur(10px)' },
                {
                    y: '0%',
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                        setCurrentIndex(index);
                        setIsAnimating(false);
                    }
                }
            );
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentIndex, isAnimating]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #050505 0%, #000 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* Background Texture */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(255, 0, 0, 0.02), rgba(255, 0, 0, 0.06))',
                backgroundSize: '100% 2px, 3px 100%',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Progress Indicators */}
            <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 10 }}>
                {sections.map((_, i) => (
                    <div key={i} style={{
                        width: '4px',
                        height: '40px',
                        background: i === currentIndex ? 'var(--color-primary)' : '#333',
                        transition: 'background 0.5s'
                    }} />
                ))}
            </div>

            <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
                {sections.map((section, index) => (
                    <div key={section.id} style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        opacity: index === 0 ? 1 : 0, // Only first visible initially
                        pointerEvents: index === currentIndex ? 'auto' : 'none'
                    }}>
                        {section.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Sections ---

const CoverSection = () => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'var(--color-primary)', letterSpacing: '5px', marginBottom: '1rem', fontSize: '1.2rem' }}>
            TOP SECRET // CLEARANCE: LEVEL 5
        </div>
        <h1 style={{ fontSize: '6rem', margin: 0, color: '#fff', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
            SUBJECT: ASAD
        </h1>
        <div style={{ marginTop: '2rem', border: '1px solid var(--color-primary)', padding: '10px 20px', display: 'inline-block', color: 'var(--color-primary)' }}>
            [ SCROLL TO DECLASSIFY ]
        </div>
    </div>
);

const BioSection = () => (
    <div className="dossier-panel" style={{ maxWidth: '800px', padding: '4rem', background: 'rgba(10,10,10,0.9)', border: '1px solid #333' }}>
        <h2 style={{ color: '#666', fontSize: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '2rem' }}>
            FILE: PERSONAL_HISTORY
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
            <div>
                <div style={{ fontSize: '4rem', color: '#fff', lineHeight: '1' }}>30+</div>
                <div style={{ fontSize: '1rem', color: '#888' }}>YEARS EXP (Simulated)</div>
            </div>
            <div style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: '1.8', fontFamily: 'monospace' }}>
                <span style={{ background: '#fff', color: '#000', padding: '2px 5px' }}>NAME:</span> Asad Saleem<br />
                <span style={{ background: '#fff', color: '#000', padding: '2px 5px' }}>ROLE:</span> System Architect<br />
                <span style={{ background: '#fff', color: '#000', padding: '2px 5px' }}>STATUS:</span> Operative<br /><br />
                "Building the impossible during the day, coding the future at night. Specializing in AI, Neural Networks, and High-Performance Web Systems."
            </div>
        </div>
    </div>
);

const ExpSection = () => (
    <div className="dossier-panel" style={{ width: '80vw', maxWidth: '1000px', padding: '3rem', background: 'rgba(10,10,10,0.9)', border: '1px solid #333' }}>
        <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '3rem', letterSpacing: '5px' }}>MISSION LOGS</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>FREELANCE @ UPWORK</h3>
                <div style={{ color: '#888', marginBottom: '1rem' }}>2024 - PRESENT // REMOTE</div>
                <ul style={{ color: '#ccc', lineHeight: '1.6', fontFamily: 'monospace' }}>
                    <li>> Maintained EdTech Platform (India Client)</li>
                    <li>> Deployed Python Scrapers (Israel Client)</li>
                    <li>> Engineered Shopify Solution (Global)</li>
                </ul>
            </div>

            <div>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>ACADEMIC TRAINING</h3>
                <div style={{ color: '#888', marginBottom: '1rem' }}>SUKKUR IBA UNIVERSITY</div>
                <p style={{ color: '#ccc', lineHeight: '1.6', fontFamily: 'monospace' }}>
                    BS Computer Science (AI)<br />
                    Focus: Deep Learning, System Arch, Algo
                </p>
            </div>
        </div>
    </div>
);

const SkillsSection = () => (
    <div className="dossier-panel" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', color: '#fff', marginBottom: '1rem' }}>WEAPONRY</h1>
        <p style={{ color: '#666', marginBottom: '3rem' }}>AUTHORIZED TECHNICAL ARSENAL</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: '900px' }}>
            {['PYTHON', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'TENSORFLOW', 'PYTORCH', 'DOCKER', 'GOOGLE CLOUD', 'THREE.JS', 'FLASK', 'MONGODB'].map((skill, i) => (
                <div key={i} style={{
                    padding: '15px 30px',
                    background: 'rgba(0, 243, 255, 0.05)',
                    border: '1px solid var(--color-primary)',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    letterSpacing: '2px'
                }}>
                    {skill}
                </div>
            ))}
        </div>
    </div>
);

const ContactSection = () => (
    <div className="dossier-panel" style={{ textAlign: 'center', background: '#000', padding: '4rem', border: '1px solid #fff' }}>
        <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '2rem' }}>MISSION STATUS: COMPLETE</h1>
        <div style={{ fontSize: '1.5rem', color: '#aaa', marginBottom: '3rem' }}>
            Ready to initiate collaboration?
        </div>
        <a
            href="mailto:asadsaleemsahto@gmail.com"
            style={{
                fontSize: '2rem',
                color: '#000',
                background: 'var(--color-primary)',
                padding: '1rem 3rem',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block'
            }}
        >
            CONTACT_AGENT
        </a>
    </div>
);
