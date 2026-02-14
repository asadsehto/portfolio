import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, Float } from '@react-three/drei';
import { projects } from '../../data/projects';
import * as THREE from 'three';

const ProjectCard = ({ project, position, rotation }) => {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (hovered) {
            mesh.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            mesh.current.material.emissiveIntensity = 2; // Glow brighter
        } else {
            mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            mesh.current.material.emissiveIntensity = 0.5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={position} rotation={rotation}>
                <mesh
                    ref={mesh}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={() => window.open(project.link, '_blank')}
                >
                    <boxGeometry args={[3, 2, 0.1]} />
                    <meshPhysicalMaterial
                        color={hovered ? '#00ffff' : '#0088aa'}
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={0.8}
                        emissive={hovered ? '#00ffff' : '#004455'}
                        emissiveIntensity={0.5}
                        transmission={0.5} // Glass
                        thickness={0.5}
                    />

                    <Html transform occlude distanceFactor={3} position={[0, 0, 0.06]} style={{ pointerEvents: 'none' }}>
                        <div style={{
                            width: '300px',
                            padding: '20px',
                            color: '#00ffff',
                            fontFamily: 'Orbitron, monospace',
                            textAlign: 'center',
                            userSelect: 'none'
                        }}>
                            <h2 style={{ margin: 0, textShadow: '0 0 5px #00ffff' }}>{project.title}</h2>
                            <p style={{ fontSize: '0.8rem', color: '#ffffff' }}>{project.description}</p>
                            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
                                {project.tech.map(t => (
                                    <span key={t} style={{
                                        border: '1px solid #00ffff',
                                        padding: '2px 5px',
                                        fontSize: '0.7rem',
                                        borderRadius: '4px'
                                    }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </Html>
                </mesh>
            </group>
        </Float>
    );
};

export const ProjectGallery = () => {
    // Arrange in a semi-circle or grid
    return (
        <group position={[0, -2, -5]}>
            {projects.map((project, index) => {
                const angle = (index / projects.length) * Math.PI * 2;
                const radius = 8;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius - 5; // Offset back
                // Rotation to face center roughly
                const rotY = -angle + Math.PI / 2;

                return (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        position={[x, 0, z]}
                        rotation={[0, rotY, 0]}
                    />
                );
            })}
        </group>
    );
};
