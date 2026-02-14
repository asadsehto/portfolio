import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export const HeroSection = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const quoteRef = useRef(null);
    const aboutRef = useRef(null);

    const scramble = (element, finalText, duration, delay = 0) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        const length = finalText.length;
        let obj = { value: 0 };

        gsap.to(obj, {
            value: 1,
            duration: duration,
            delay: delay,
            ease: "none",
            onUpdate: () => {
                const progress = Math.floor(obj.value * length);
                let text = finalText.substring(0, progress);
                for (let i = progress; i < length; i++) {
                    text += chars[Math.floor(Math.random() * chars.length)];
                }
                if (element.current) element.current.innerText = text;
            }
        });
    };

    useEffect(() => {
        // Main Title
        scramble(titleRef, 'ASAD', 1.5);
        scramble(subtitleRef, 'SYSTEM ARCHITECT', 1.5, 0.5);

        // Typewriter About
        gsap.to(aboutRef.current, {
            text: {
                value: "CREATIVE DEVELOPER // 30 YEARS EXP // BUILDING THE IMPOSSIBLE",
                delimiter: ""
            },
            duration: 2,
            delay: 2,
            ease: "none"
        });

        // Sisyphus Infinite Scroll
        gsap.to(quoteRef.current, {
            xPercent: -100,
            repeat: -1,
            duration: 20,
            ease: "linear"
        });
    }, []);

    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
            position: 'relative'
        }}>
            <h1
                ref={titleRef}
                className="text-glow"
                style={{
                    fontSize: 'clamp(5rem, 15vw, 12rem)',
                    margin: 0,
                    lineHeight: 0.8,
                    letterSpacing: '-5px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    opacity: 0.9
                }}
            >
                INIT...
            </h1>

            <h2
                ref={subtitleRef}
                style={{
                    fontSize: 'clamp(1rem, 3vw, 2rem)',
                    color: 'var(--color-primary)',
                    letterSpacing: '10px',
                    marginTop: '1rem',
                    fontWeight: 300
                }}
            >
                LOADING...
            </h2>

            <div
                ref={aboutRef}
                style={{
                    height: '20px',
                    marginTop: '2rem',
                    color: '#888',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                }}
            />

            {/* Creative positioning of the Sisyphus quote: A 'System Mantra' running along the bottom */}
            <div style={{
                position: 'absolute',
                bottom: '15vh',
                width: '100%',
                overflow: 'hidden',
                opacity: 0.5,
                borderTop: '1px solid #333',
                borderBottom: '1px solid #333',
                padding: '10px 0',
                background: 'rgba(0,0,0,0.5)'
            }}>
                <div ref={quoteRef} style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', color: '#555', fontFamily: 'monospace' }}>
                    ONE MUST IMAGINE SISYPHUS HAPPY // THE IMPOSSIBLE DREAM // EXECUTE PROTOCOL 99 // RECURSION COMPLETE //
                    ONE MUST IMAGINE SISYPHUS HAPPY // THE IMPOSSIBLE DREAM // EXECUTE PROTOCOL 99 // RECURSION COMPLETE //
                    ONE MUST IMAGINE SISYPHUS HAPPY // THE IMPOSSIBLE DREAM // EXECUTE PROTOCOL 99 // RECURSION COMPLETE //
                </div>
            </div>
        </section>
    );
};
