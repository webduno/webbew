'use client';
import { useBox } from '@react-three/cannon';
import { Mesh } from 'three';


export const PhysicalDoor = ({
  visible = true, position = [0, 0, -0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number], size = [100, 100, 2] as [number, number, number], color = "lightgrey", friction = 0.5, restitution = 0.1
}) => {
  const boxSize: [number, number, number] = [size[0], size[1], size[2]];

  const [ref] = useBox(() => ({
    rotation: rotation,
    position: position,
    args: boxSize,
    type: 'Static',
    material: {
      friction: friction,
      restitution: restitution
    }
  }));

  if (!visible) {
    return null;
  }

  return (
    <mesh ref={ref as React.Ref<Mesh>} receiveShadow >
      <boxGeometry args={boxSize} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
