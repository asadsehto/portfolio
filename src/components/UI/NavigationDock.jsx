import { useIsMobile } from '../../hooks/useIsMobile';

export const NavigationDock = ({ activeView, setView, toggleTerminal, isTerminalOpen }) => {
    const isMobile = useIsMobile();

    const items = [
        { id: 'HOME', label: '// HOME', short: 'HOME' },
        { id: 'PROJECTS', label: '// PROJECTS', short: 'WORK' },
        { id: 'IDENTITY', label: '// IDENTITY', short: 'INFO' },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: isMobile ? 0 : '2rem',
            left: isMobile ? 0 : '50%',
            right: isMobile ? 0 : 'auto',
            transform: isMobile ? 'none' : 'translateX(-50%)',
            display: 'flex',
            gap: isMobile ? 0 : '1rem',
            justifyContent: isMobile ? 'space-between' : 'flex-start',
            background: 'rgba(8, 8, 10, 0.9)',
            padding: isMobile ? '0.5rem calc(0.75rem + env(safe-area-inset-left)) calc(0.5rem + env(safe-area-inset-bottom)) calc(0.75rem + env(safe-area-inset-right))' : '10px 20px',
            borderRadius: isMobile ? 0 : '12px',
            border: isMobile ? 'none' : '1px solid var(--color-glass-border)',
            borderTop: isMobile ? '1px solid var(--color-glass-border)' : undefined,
            backdropFilter: 'blur(12px)',
            zIndex: 100,
            boxShadow: isMobile ? '0 -8px 24px -8px rgba(0,0,0,0.8)' : '0 10px 30px -10px rgba(0,0,0,0.8)'
        }}>
            {/* View Switchers */}
            {items.map(item => {
                const isActive = activeView === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        style={{
                            flex: isMobile ? 1 : 'none',
                            background: isActive ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                            border: isActive ? '1px solid var(--color-primary)' : '1px solid transparent',
                            color: isActive ? 'var(--color-primary)' : '#888',
                            padding: isMobile ? '10px 6px' : '10px 20px',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontSize: isMobile ? '0.75rem' : '0.9rem',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            textShadow: isActive ? '0 0 10px var(--color-primary)' : 'none',
                            whiteSpace: 'nowrap'
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
                        {isMobile ? item.short : item.label}
                    </button>
                );
            })}

            {/* Separator */}
            <div style={{ width: '1px', background: '#333', margin: isMobile ? '4px' : '0 5px' }} />

            {/* Terminal Toggle */}
            <button
                onClick={toggleTerminal}
                style={{
                    flex: isMobile ? 1 : 'none',
                    background: isTerminalOpen ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
                    border: '1px solid ' + (isTerminalOpen ? '#ff0000' : 'transparent'),
                    color: isTerminalOpen ? '#ff0000' : '#888',
                    padding: isMobile ? '10px 6px' : '10px 20px',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.75rem' : '0.9rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    whiteSpace: 'nowrap'
                }}
            >
                {isTerminalOpen ? '× CLOSE' : (isMobile ? '>_ CMD' : '>_ CMD')}
            </button>
        </div>
    );
};
