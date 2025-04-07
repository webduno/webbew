'use client';
import { useBox } from '@react-three/cannon';
import { useRef, useEffect } from 'react';
import { Mesh } from 'three';


export const PhysicalTrigger = ({
    triggerCount = 1,
  visible = true,
  position = [0, 0, -0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  size = [100, 100, 2] as [number, number, number],
  color = "lightgrey", friction = 0.5, restitution = 0.1,
  onCollide = (e: any) => {}
}) => {
  const boxSize: [number, number, number] = [size[0], size[1], size[2]];
  const triggeredCountRef = useRef(0);
  const meshRef = useRef<Mesh>(null);
  
  const [ref] = useBox(() => ({
    rotation: rotation,
    position: position,
    args: boxSize,
    type: 'Static',
    material: {
      friction: friction,
      restitution: restitution
    },
    onCollide: (e) => {
        // Print detailed debug info
        console.log('PhysicalTrigger collision detected:', 
                    'triggered:', triggeredCountRef.current, 
                    'triggerCount:', triggerCount,
                    'userData:', e.body?.userData);
                    
        // early return
        if (triggeredCountRef.current >= triggerCount) {
            console.log('Trigger max count reached');
            return;
        }
      // Check if collision is with the player
      if (e.body?.userData?.type === 'player') {
        console.log('Player collision detected');
        triggeredCountRef.current += 1;
        onCollide(e);
      }
    },
    isTrigger: true // Make it a trigger (no physical collision, just events)
  }), meshRef);

  if (!visible) {
    return null;
  }

  return (
    <mesh ref={ref as React.Ref<Mesh>} receiveShadow>
      <boxGeometry args={boxSize} />
      <meshStandardMaterial color={color} 
       />
    </mesh>
  );
};
