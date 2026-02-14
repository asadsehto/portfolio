import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export const HeroSection = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Set initial state
            gsap.set('.redaction-bar', { scaleX: 1, transformOrigin: 'left' });
            gsap.set('.line-item', { opacity: 0, x: -20 });

            // Animate the redaction bars to shrink (reveal text)
            tl.to('.redaction-bar', {
                scaleX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.inOut",
                delay: 0.2
            })
                .to('.line-item', {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1
                }, "-=0.6");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'monospace'
        }}>
            <div style={{
                background: 'rgba(5, 5, 10, 0.8)',
                border: '1px solid #333',
                padding: '4rem',
                maxWidth: '800px',
                width: '90%',
                position: 'relative',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)'
            }}>
                {/* Header Stamps */}
                <div style={{ position: 'absolute', top: '1rem', right: '2rem', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', padding: '5px 10px', transform: 'rotate(-5deg)', opacity: 0.7, fontWeight: 'bold' }}>
                    CONFIDENTIAL
                </div>

                <div style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>// PERSONNEL_FILE_01</span>
                    <span style={{ color: '#0f0' }}>● ACTIVE</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '2rem', alignItems: 'center' }}>
                    {/* Photo Placeholder / Avatar */}
                    <div style={{
                        width: '120px', height: '120px',
                        border: '1px solid #444',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#444', background: '#000'
                    }}>
                        [NO_IMAGE]
                    </div>

                    {/* Core Data */}
                    <div>
                        <div className="line-item" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#666', marginRight: '1rem', width: '80px' }}>SUBJECT:</span>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>ASAD SALEEM</span>
                                <div className="redaction-bar" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#fff', zIndex: 2 }} />
                            </div>
                        </div>
                        <div className="line-item" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#666', marginRight: '1rem', width: '80px' }}>ROLE:</span>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <span style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>AI ENGINEER & DEVELOPER</span>
                                <div className="redaction-bar" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#fff', zIndex: 2 }} />
                            </div>
                        </div>
                        <div className="line-item">
                            <span style={{ color: '#666', marginRight: '1rem' }}>CLEARANCE:</span>
                            <span style={{ color: '#aaa' }}>LEVEL 5 // SYSTEM ACCESS GRANTED</span>
                        </div>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div style={{ width: '100%', height: '1px', background: '#333', margin: '2rem 0' }} />

                {/* Little Overview */}
                <div className="line-item">
                    <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>// OVERVIEW_SUMMARY</h3>
                    <p style={{ color: '#ccc', lineHeight: '1.8', maxWidth: '600px' }}>
                        Specialized operative in <strong>Artificial Intelligence</strong> and <strong>Full-Stack Development</strong>.
                        Currently engaged in building advanced neural networks and high-performance web systems.
                        Proven track record in deploying autonomous agents and scalable architectures.
                    </p>
                </div>

                {/* Footer Data */}
                <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', fontSize: '0.8rem', color: '#666' }}>
                    <span>LOC: PAKISTAN</span>
                    <span>EXP: 3 YEARS</span>
                    <span>STACK: PYTHON, JS, C++</span>
                </div>

            </div>
        </div>
    );
};
