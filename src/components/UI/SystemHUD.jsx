import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useIsMobile, useIsSmallMobile } from '../../hooks/useIsMobile';

export const SystemHUD = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const topBar = useRef(null);
    const isMobile = useIsMobile();
    const isSmallMobile = useIsSmallMobile();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        gsap.fromTo(topBar.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
        );
    }, []);

    const Corner = ({ top, bottom, left, right }) => (
        <div style={{
            position: 'absolute',
            top, bottom, left, right,
            width: '20px',
            height: '20px',
            borderColor: 'var(--color-primary)',
            borderStyle: 'solid',
            borderTopWidth: top !== undefined ? '2px' : '0',
            borderBottomWidth: bottom !== undefined ? '2px' : '0',
            borderLeftWidth: left !== undefined ? '2px' : '0',
            borderRightWidth: right !== undefined ? '2px' : '0',
            opacity: 0.5,
            pointerEvents: 'none'
        }} />
    );

    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>

            {/* Top HUD */}
            <div ref={topBar} style={{
                position: 'absolute', top: 0, left: 0, width: '100%',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: isMobile ? '12px 16px' : '20px', boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }}></div>
                    {!isSmallMobile && (
                        <span style={{ fontFamily: 'monospace', fontSize: isMobile ? '0.65rem' : '0.8rem', color: 'var(--color-primary)' }}>SYS.ONLINE</span>
                    )}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: isMobile ? '0.75rem' : '1rem', color: 'var(--color-text)', textShadow: '0 0 5px var(--color-primary)' }}>
                    {time}
                </div>
                {!isMobile && (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-primary)' }}>LOC: GRID_NODE_01</span>
                        <div style={{ width: '10px', height: '10px', border: '1px solid var(--color-primary)' }}></div>
                    </div>
                )}
                {isMobile && (
                    <div style={{ width: '8px', height: '8px', border: '1px solid var(--color-primary)' }}></div>
                )}
            </div>

            {/* CSS Corner Brackets — decorative, hidden on mobile to reduce clutter */}
            {!isMobile && (
                <>
                    <Corner top="30px" left="30px" />
                    <Corner top="30px" right="30px" />
                    <Corner bottom="30px" left="30px" />
                    <Corner bottom="30px" right="30px" />
                </>
            )}
        </div>
    );
};
