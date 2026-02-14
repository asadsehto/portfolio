export const NavigationDock = ({ activeView, setView, toggleTerminal, isTerminalOpen }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '1rem',
            background: 'rgba(10, 10, 10, 0.8)',
            padding: '10px 20px',
            borderRadius: '12px',
            border: '1px solid var(--color-glass-border)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.8)'
        }}>
            {/* View Switchers */}
            {[
                { id: 'HERO', label: '// HOME' },
                { id: 'PROJECTS', label: '// PROJECTS' },
                { id: 'IDENTITY', label: '// IDENTITY' },
            ].map(item => {
                const isActive = activeView === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        style={{
                            background: isActive ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                            border: isActive ? '1px solid var(--color-primary)' : '1px solid transparent',
                            color: isActive ? 'var(--color-primary)' : '#888',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            textShadow: isActive ? '0 0 10px var(--color-primary)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive) {
                                e.target.style.color = '#fff';
                                e.target.style.borderColor = '#444';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive) {
                                e.target.style.color = '#888';
                                e.target.style.borderColor = 'transparent';
                            }
                        }}
                    >
                        {item.label}
                    </button>
                );
            })}

            {/* Separator */}
            <div style={{ width: '1px', background: '#333', margin: '0 5px' }} />

            {/* Terminal Toggle */}
            <button
                onClick={toggleTerminal}
                style={{
                    background: isTerminalOpen ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
                    border: '1px solid ' + (isTerminalOpen ? '#ff0000' : 'transparent'),
                    color: isTerminalOpen ? '#ff0000' : '#888',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                }}
            >
                {isTerminalOpen ? '× CLOSE' : '>_ CMD'}
            </button>
        </div>
    );
};
