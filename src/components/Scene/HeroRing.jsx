import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';

export const HeroRing = () => {
    const outerRing = useRef();
    const midRing = useRef();
    const innerCore = useRef();
    const particles = useRef();

    useFrame((state, delta) => {
        if (outerRing.current) {
            outerRing.current.rotation.z += delta * 0.1;
            outerRing.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
        if (midRing.current) {
            midRing.current.rotation.z -= delta * 0.2;
            midRing.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
        }
        if (innerCore.current) {
            innerCore.current.rotation.x += delta * 0.5;
            innerCore.current.rotation.z += delta * 0.5;
        }
    });

    const neonMaterial = new THREE.MeshStandardMaterial({
        color: '#00ffff',
        emissive: '#00ffff',
        emissiveIntensity: 2,
        toneMapped: false,
        roughness: 0.2,
        metalness: 0.8
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
        color: '#111111',
        roughness: 0.4,
        metalness: 0.9
    });

    return (
        <group rotation={[Math.PI / 6, 0, 0]} scale={1.5}>
            {/* Outer Segmented Ring (The Disc Edge) */}
            <group ref={outerRing}>
                <Torus args={[3, 0.1, 8, 50]} material={neonMaterial} />
                <Torus args={[3.2, 0.05, 4, 30]} rotation={[0, 0, 0]} material={darkMetalMaterial} />
                {/* Decorative Blocks on Ring */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} rotation={[0, 0, (i / 8) * Math.PI * 2]} position={[3, 0, 0]}>
                        <boxGeometry args={[0.2, 0.5, 0.2]} />
                        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
                    </mesh>
                ))}
            </group>

            {/* Middle Complex Ring */}
            <group ref={midRing}>
                <Torus args={[2.5, 0.05, 4, 40]} material={neonMaterial} />
                {/* Gaps/Cuts using multiple arc torus segments could be heavy, using primitives for now */}
                <Cylinder args={[2.4, 2.4, 0.1, 32, 1, true]} Material={neonMaterial} rotation={[Math.PI / 2, 0, 0]}>
                    <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.3} />
                </Cylinder>
            </group>

            {/* Inner Data Core */}
            <group ref={innerCore}>
                <Box args={[1, 1, 1]} material={neonMaterial} wireframe />
                <mesh>
                    <sphereGeometry args={[0.6, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" wireframe />
                </mesh>
            </group>
        </group>
    );
};
