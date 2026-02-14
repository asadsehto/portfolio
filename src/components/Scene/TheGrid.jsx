import { Grid } from '@react-three/drei';

export const TheGrid = () => {
    return (
        <Grid
            position={[0, -2, 0]}
            args={[100, 100]} // Size
            cellSize={1}
            cellThickness={0.5}
            cellColor="#00ffff"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#ff00ff"
            fadeDistance={30}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
        />
    );
};
