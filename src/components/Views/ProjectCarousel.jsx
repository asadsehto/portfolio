import { projects } from '../../data/projects';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);

    const onHover = () => {
        gsap.to(cardRef.current, { scale: 1.05, borderColor: 'var(--color-primary)', boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)', duration: 0.3 });
    };

    const onLeave = () => {
        gsap.to(cardRef.current, { scale: 1, borderColor: '#333', boxShadow: 'none', duration: 0.3 });
    };

    return (
        <a
            href={project.link}
            target="_blank"
            ref={cardRef}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            style={{
                minWidth: '350px',
                height: '450px',
                background: 'rgba(5, 5, 5, 0.8)',
                border: '1px solid #333',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                textDecoration: 'none',
                color: '#eee',
                position: 'relative',
                transition: 'transform 0.1s',
                marginRight: '2rem',
                scrollSnapAlign: 'center'
            }}
        >
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
                background: 'linear-gradient(90deg, var(--color-primary), transparent)'
            }} />

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>
                {project.title}
            </h2>

            <p style={{ fontSize: '1rem', color: '#aaa', lineHeight: 1.6, flex: 1 }}>
                {project.description}
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '2rem' }}>
                {project.tech.map(t => (
                    <span key={t} style={{
                        border: '1px solid #444',
                        padding: '5px 10px',
                        fontSize: '0.8rem',
                        color: 'var(--color-primary)',
                        fontFamily: 'monospace'
                    }}>
                        {t}
                    </span>
                ))}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'right', fontSize: '0.8rem', color: '#666' }}>
                // ACCESS_REPO_
            </div>
        </a>
    );
};

export const ProjectCarousel = () => {
    const containerRef = useRef(null);

    // Specific Order Requested
    const order = [
        'caretoshare',
        'rizzume',
        'droplist',
        'semantic-book-recommender',
        'alif-ai',
        'savetube',
        'twitterxbot'
    ];

    // Sort projects
    const sortedProjects = projects
        .filter(p => p.type === 'repo')
        .sort((a, b) => {
            const indexA = order.indexOf(a.id);
            const indexB = order.indexOf(b.id);
            // Put requested ones first, others at the end
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

    useEffect(() => {
        gsap.fromTo(containerRef.current.children,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }
        );
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '10vw' // Offset for style
        }}>
            <h2 style={{
                color: 'var(--color-primary)',
                fontSize: '2rem',
                marginBottom: '2rem',
                letterSpacing: '5px'
            }}>
                PROJECT_DATABASE
            </h2>

            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    paddingBottom: '4rem', // Space for scrollbar/dock
                    scrollSnapType: 'x mandatory',
                    width: '100%',
                    paddingRight: '10vw'
                }}
                className="hide-scrollbar"
            >
                {sortedProjects.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                ))}
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};
