'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
    const meshRef = useRef<THREE.Points>(null);
    const count = 2000;

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            pos[i3] = (Math.random() - 0.5) * 20;
            pos[i3 + 1] = (Math.random() - 0.5) * 20;
            pos[i3 + 2] = (Math.random() - 0.5) * 20;

            const t = Math.random();
            if (t < 0.33) {
                col[i3] = 0; col[i3 + 1] = 0.94; col[i3 + 2] = 1;
            } else if (t < 0.66) {
                col[i3] = 0.66; col[i3 + 1] = 0.33; col[i3 + 2] = 0.97;
            } else {
                col[i3] = 0.93; col[i3 + 1] = 0.29; col[i3 + 2] = 0.6;
            }
        }
        return [pos, col];
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;

            const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001;
            }
            meshRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

function FloatingGeometry() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[2, 0, -2]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial
                color="#00f0ff"
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

export default function ParticleField() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
            >
                <Particles />
                <FloatingGeometry />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
}
