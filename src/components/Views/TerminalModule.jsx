import { useState, useRef, useEffect } from 'react';

export const TerminalModule = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'WELCOME TO ASAD_OS KERNEL V1.0' },
        { type: 'output', content: 'TYPE "help" FOR AVAILABLE COMMANDS.' },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const commands = {
        help: () => [
            'AVAILABLE COMMANDS:',
            '  about     - Display system info',
            '  projects  - List repository database',
            '  contact   - Show communication channels',
            '  clear     - Clear terminal buffer',
            '  sudo      - [RESTRICTED]'
        ],
        about: () => [
            'SYSTEM ARCHITECT: ASAD SALEEM',
            'LEVEL: 30 YEARS EXP (Simulated)',
            'MISSION: BUILDING THE DIGITAL FRONTIER',
            'STATUS: ONLINE'
        ],
        contact: () => [
            'EMAIL: asadsaleemsahto@gmail.com',
            'PHONE: +92 308 9298868',
            'LINKEDIN: linkedin.com/in/asadsaleemsahto'
        ],
        projects: () => [
            'LOADING REPOSITORY DATABASE...',
            '--------------------------------',
            '1. CareToShare (React/Node)',
            '2. Rizzume (React/Python)',
            '3. ALIF-AI (Python/AI)',
            '4. Semantic Book Recommender',
            '5. Savetube',
            '--------------------------------',
            'Use navigation dock to view details.'
        ],
        sudo: () => ['ACCESS DENIED. NICE TRY.'],
        clear: () => [],
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
            response = [`COMMAND NOT FOUND: "${trimmed}"`];
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
        // Auto-scroll to bottom
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input on click
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4rem 2rem'
        }} onClick={() => inputRef.current?.focus()}>

            <div style={{
                width: '100%',
                maxWidth: '800px',
                height: '70vh',
                background: 'rgba(10, 10, 10, 0.95)',
                border: '1px solid #444',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                borderRadius: '8px',
                padding: '2rem',
                fontFamily: 'Consolas, monospace',
                color: '#ccc',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Terminal Header */}
                <div style={{
                    borderBottom: '1px solid #333',
                    paddingBottom: '1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#666',
                    fontSize: '0.8rem'
                }}>
                    <span>bash --login</span>
                    <span>root@asad-portfolio</span>
                </div>

                {/* Output Area */}
                <div ref={containerRef} style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }} className="hide-scrollbar">
                    {history.map((line, i) => (
                        <div key={i} style={{ marginBottom: '5px', color: line.type === 'input' ? '#fff' : '#00ffff' }}>
                            {line.type === 'input' ? '> ' : ''}{line.content}
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                    <span style={{ color: '#00ffff', marginRight: '10px' }}>user@grid:~$</span>
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
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
};
