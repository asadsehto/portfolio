import { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, Plane } from '@react-three/drei';
import * as THREE from 'three';

const CyberGridMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#000000'),
    uColorEnd: new THREE.Color('#00ffff'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    // Pseudo-random function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // Grid logic
      vec2 gridUV = vUv * 20.0; // Scale grid
      gridUV.y += uTime * 0.5; // Scroll grid
      
      vec2 grid = fract(gridUV);
      float line = step(0.95, grid.x) + step(0.95, grid.y);
      
      // Horizon fade
      float fade = 1.0 - vUv.y;
      fade = pow(fade, 2.0); // Non-linear fade

      // Digital noise/rain
      float noise = random(floor(gridUV + vec2(0.0, uTime * -2.0)));
      float rain = step(0.98, noise) * fade;

      vec3 color = mix(uColorStart, uColorEnd, line * fade);
      color += uColorEnd * rain * 2.0; // Add bright rain drops

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ CyberGridMaterial });

export const CyberGridShader = () => {
  const materialRef = useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta * 0.2; // Slowed down from 1.0 (implicit) or default
    }
  });

  return (
    <Plane args={[2, 2]} scale={[10, 10, 1]}>
      {/* Scale heavily to cover view or use ScreenQuad if available, but big plane works for simple background */}
      <cyberGridMaterial ref={materialRef} transparent />
    </Plane>
  );
};
