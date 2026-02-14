import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TerminalOverlay = ({ searchIsOpen, onClose }) => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'CONNECTED TO ASAD_OS...' },
        { type: 'output', content: 'SYSTEM READY. TYPE "help"' },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const commands = {
        help: () => ['COMMANDS: projects, bio, contact, clear, exit'],
        bio: () => ['ASAD SALEEM // SYSTEM ARCHITECT // AI SPECIALIST'],
        projects: () => ['accessing database... [CARE_TO_SHARE, RIZZUME, ALIF-AI]'],
        contact: () => ['asadsaleemsahto@gmail.com | +92 308 9298868'],
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
                        height: '40vh', // Half screen height
                        background: 'rgba(5, 5, 10, 0.9)',
                        backdropFilter: 'blur(15px)',
                        borderTop: '2px solid var(--color-primary)',
                        zIndex: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 -10px 50px rgba(0,0,0,0.8)'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '10px 20px',
                        background: 'rgba(0,255,255,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #333'
                    }}>
                        <span style={{ fontFamily: 'monospace', color: 'var(--color-primary)', fontSize: '0.8rem' }}>
                            {'>_'} SECURE_TERMINAL_UPLINK
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
                            color: '#ccc'
                        }}
                        onClick={() => inputRef.current?.focus()}
                    >
                        {history.map((line, i) => (
                            <div key={i} style={{ marginBottom: '4px', color: line.type === 'input' ? '#fff' : '#00ffff' }}>
                                {line.type === 'input' ? '> ' : ''}{line.content}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} style={{ padding: '10px 20px', borderTop: '1px solid #333' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: 'var(--color-primary)', marginRight: '10px' }}>$</span>
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
