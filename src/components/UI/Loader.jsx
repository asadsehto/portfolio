import { useState, useEffect } from 'react';

export const Loader = ({ onStarted }) => {
    const [text, setText] = useState([]);
    const [progress, setProgress] = useState(0);
    const [finished, setFinished] = useState(false);

    const bootLines = [
        'INITIALIZING KERNEL...',
        'LOADING GRAPHICS DRIVERS...',
        'CONNECTING TO THE GRID...',
        'AUTHENTICATING USER...',
        'ACCESS GRANTED.',
        'SYSTEM ONLINE.'
    ];

    useEffect(() => {
        let lineIndex = 0;
        const textInterval = setInterval(() => {
            if (lineIndex < bootLines.length) {
                setText(prev => [...prev, bootLines[lineIndex]]);
                lineIndex++;
            } else {
                clearInterval(textInterval);
            }
        }, 500);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => setFinished(true), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 60);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
        };
    }, []);

    if (finished) {
        // Trigger callback to start main app music or animations if needed
        if (onStarted) onStarted();
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#000',
            color: '#00ffff',
            fontFamily: 'monospace',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
        }}>
            <div style={{ width: '300px' }}>
                <h1 style={{ margin: '0 0 20px 0', textShadow: '0 0 10px #00ffff' }}>TRON: ARES</h1>
                <div style={{ fontFamily: 'Consolas, monospace', fontSize: '0.9rem', marginBottom: '20px', height: '150px', overflow: 'hidden' }}>
                    {text.map((line, i) => (
                        <div key={i}>&gt; {line}</div>
                    ))}
                    <div className="blink">_</div>
                </div>

                <div style={{ width: '100%', height: '4px', background: '#333', marginTop: '10px' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: '#00ffff', boxShadow: '0 0 10px #00ffff' }} />
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '5px' }}>{progress}%</div>
            </div>

            <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .blink { animation: blink 1s step-end infinite; }
      `}</style>
        </div>
    );
};
