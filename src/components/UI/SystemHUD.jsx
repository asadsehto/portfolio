import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const SystemHUD = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const topBar = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Intro Animation
        gsap.fromTo(topBar.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
        );
    }, []);

    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>

            {/* Top HUD */}
            <div ref={topBar} style={{
                position: 'absolute', top: 0, left: 0, width: '100%',
                display: 'flex', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', background: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }}></div>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-primary)' }}>SYS.ONLINE</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: 'var(--color-text)', textShadow: '0 0 5px var(--color-primary)' }}>
                    {time}
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-primary)' }}>LOC: GRID_NODE_01</span>
                    <div style={{ width: '10px', height: '10px', border: '1px solid var(--color-primary)' }}></div>
                </div>
            </div>

            {/* Corner Brackets (SVG) */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.5 }}>
                <path d="M 30 30 L 10 30 L 10 50" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
                <path d="M calc(100% - 30px) 30 L calc(100% - 10px) 30 L calc(100% - 10px) 50" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
                <path d="M 30 calc(100% - 30px) L 10 calc(100% - 30px) L 10 calc(100% - 50px)" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
                <path d="M calc(100% - 30px) calc(100% - 30px) L calc(100% - 10px) calc(100% - 30px) L calc(100% - 10px) calc(100% - 50px)" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
            </svg>
        </div>
    );
};
