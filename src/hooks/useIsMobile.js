import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(query).matches
    );

    useEffect(() => {
        const mql = window.matchMedia(query);
        const handler = (e) => setMatches(e.matches);
        setMatches(mql.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [query]);

    return matches;
};

export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsSmallMobile = () => useMediaQuery('(max-width: 420px)');
