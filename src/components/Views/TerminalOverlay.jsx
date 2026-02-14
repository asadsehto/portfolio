import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TerminalOverlay = ({ searchIsOpen, onClose }) => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'CONNECTED TO ASAD_OS...' },
        { type: 'output', content: 'SYSTEM READY. TYPE "help"' },
    ]);
    const [input, setInput] = useState('');
    const [glitchMode, setGlitchMode] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const commands = {
        help: () => ['COMMANDS: projects, bio, contact, clear, matrix, exit'],
        bio: () => ['ASAD SALEEM // AI ENGINEER & DEVELOPER'],
        projects: () => [
            ' scanning_repo...',
            '----------------------------------------',
            ' 1. CARE_TO_SHARE  [React, Node, Mongo]',
            ' 2. RIZZUME        [Python, LaTeX, AI]',
            ' 3. ALIF_AI        [NLP, Quranic Data]',
            ' 4. SAVETUBE       [React, API Integ]',
            '----------------------------------------',
            ' DONE.'
        ],
        contact: () => ['asadsaleemsahto@gmail.com | +92 308 9298868'],
        matrix: () => {
            setGlitchMode(true);
            setTimeout(() => setGlitchMode(false), 5000);
            return ['INITIATING NEURAL LINK...', 'DOWNLOADING CONSCIOUSNESS...', '...SUCCESS'];
        },
        clear: () => [],
        exit: () => { onClose(); return ['TERMINATING SESSION...']; }
    };

    const handleCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        let response = [];

        if (trimmed === 'clear') {
            setHistory([]);
            return;
        }

        if (commands[trimmed]) {
            response = commands[trimmed]();
        } else if (trimmed !== '') {
            response = [`ERR: "${trimmed}" UNKNOWN`];
        }

        setHistory(prev => [
            ...prev,
            { type: 'input', content: cmd },
            ...response.map(line => ({ type: 'output', content: line }))
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCommand(input);
        setInput('');
    };

    useEffect(() => {
        if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [history]);

    // Auto focus when opened
    useEffect(() => {
        if (searchIsOpen) setTimeout(() => inputRef.current?.focus(), 100);
    }, [searchIsOpen]);

    return (
        <AnimatePresence>
            {searchIsOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '40vh',
                        background: glitchMode ? 'rgba(0, 20, 0, 0.95)' : 'rgba(5, 5, 10, 0.9)',
                        backdropFilter: 'blur(15px)',
                        borderTop: glitchMode ? '2px solid #0f0' : '2px solid var(--color-primary)',
                        zIndex: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 -10px 50px rgba(0,0,0,0.8)'
                    }}
                >
                    {/* Matrix Effect Overlay */}
                    {glitchMode && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', opacity: 0.1, color: '#0f0', fontSize: '20px', wordBreak: 'break-all' }}>
                            {Array(500).fill(0).map(() => Math.random() > 0.5 ? '1' : '0')}
                        </div>
                    )}

                    {/* Header */}
                    <div style={{
                        padding: '10px 20px',
                        background: glitchMode ? 'rgba(0,255,0,0.1)' : 'rgba(0,255,255,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #333'
                    }}>
                        <span style={{ fontFamily: 'monospace', color: glitchMode ? '#0f0' : 'var(--color-primary)', fontSize: '0.8rem' }}>
                            {'>_'} {glitchMode ? 'MATRIX_UPLINK_ESTABLISHED' : 'SECURE_TERMINAL_UPLINK'}
                        </span>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#666',
                                cursor: 'pointer',
                                fontSize: '1.2rem'
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {/* Output */}
                    <div
                        ref={containerRef}
                        style={{
                            flex: 1,
                            padding: '20px',
                            overflowY: 'auto',
                            fontFamily: 'Consolas, monospace',
                            fontSize: '0.9rem',
                            color: glitchMode ? '#0f0' : '#ccc'
                        }}
                        onClick={() => inputRef.current?.focus()}
                    >
                        {history.map((line, i) => (
                            <div key={i} style={{ marginBottom: '4px', color: line.type === 'input' ? '#fff' : (glitchMode ? '#0f0' : '#00ffff') }}>
                                {line.type === 'input' ? '> ' : ''}{line.content}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} style={{ padding: '10px 20px', borderTop: '1px solid #333' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: glitchMode ? '#0f0' : 'var(--color-primary)', marginRight: '10px' }}>$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    outline: 'none',
                                    fontFamily: 'Consolas, monospace',
                                    fontSize: '1rem'
                                }}
                                autoFocus
                            />
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
