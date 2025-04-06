'use client';
import { Box } from '@react-three/drei';
import { PhysicalTrigger } from './PhysicalTrigger';
import { PhysicalWall } from './PhysicalWall';
import { PhysicalDoor } from './PhysicalDoor';
import { StyledWall } from './StyledWall';



export const BCDoorPortals = ({ setPlayerPosition }: { setPlayerPosition: (position: [number, number, number]) => void; }) => {
  return (<>




      {/* main frontal door */}
      <PhysicalDoor
        size={[.2, 4, 2]}
        position={[0, 2, -5]} rotation={[0, -Math.PI / 2, 0]} />
      {/* doorknob */}
      <Box position={[-.5, 1.5, -4.75]} args={[.2, .2, .2]} castShadow>
        <meshStandardMaterial color="#aaaaaa"
          metalness={.5} roughness={0} />
      </Box>







{/* left wall */}
      <StyledWall color="#ffffff"
        size={[10, 4, 1]}
        position={[-6, 2, -5]} 
         />

{/* right wall */}
      <PhysicalWall color="#ffffff"
        size={[1, 4, 5]}
        position={[3.5, 2, -5]} rotation={[0, -Math.PI / 2, 0]} />
      









      {/* front bevel */}
      <PhysicalWall color="#f7f7f7"
        size={[1.1, 1, 20.1]}
        position={[-4, 3.6, -5]} rotation={[0, -Math.PI / 2, 0]} />


        
      {/* front bottom barriers */}
      <Box args={[5.1, 0.4, 1.1]} position={[3.5, 0, -5]}>
        <meshStandardMaterial color="#cccccc" />
      </Box>

    
  </>);
};
