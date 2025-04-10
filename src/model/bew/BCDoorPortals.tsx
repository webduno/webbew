'use client';
import { Box, Text } from '@react-three/drei';
import { PhysicalTrigger } from './PhysicalTrigger';
import { PhysicalWall } from './PhysicalWall';
import { PhysicalDoor } from './PhysicalDoor';
import { StyledWall } from './StyledWall';



export const BCDoorPortals = ({ setPlayerPosition }: { setPlayerPosition: (position: [number, number, number]) => void; }) => {
  return (<>





  

<PhysicalTrigger visible={false} triggerCount={999}
      onCollide={(e) => {
        setPlayerPosition([0, 0, -3.8]);
      }}

      size={[1, 4, 0.2]}
      position={[0, 1, -5.2]}
      rotation={[0, 0, 0]} />


<Text position={[0.1, 1.75, -5.12]} rotation={[0, Math.PI, -0.05]} anchorX="center" anchorY="middle"
textAlign="center" color="#333333"
fontSize={0.3} font={"/fonts/beanie.ttf"}
>
  {`
  EXTRA
  SENSORIAL
  PERCEPTION
  |
  |
  |
  (ESP) LAB
  `}
</Text>


      {/* main frontal door */}
      <PhysicalDoor color="#cccccc"
        size={[.2, 4, 2]}
        position={[0, 2, -5]} rotation={[0, -Math.PI / 2, 0]} />
      {/* doorknob */}
      <Box position={[-.5, 1.5, -4.9]} args={[.2, .2, .2]} castShadow>
        <meshStandardMaterial color="#aaaaaa"/>
      </Box>

      <Box position={[-.5, 1.5, -5.1]} args={[.2, .2, .2]} >
        <meshStandardMaterial color="#aaaaaa"/>
      </Box>








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
