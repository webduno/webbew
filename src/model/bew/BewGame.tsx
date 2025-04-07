'use client';
import { isMobile } from '@/../scripts/utils/mobileDetection';
import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { useState, useEffect, useCallback, useRef } from 'react';
import { BewMainScene } from '@/model/bew/BewMainScene';
import { RoomC } from './RoomC';
import { BewMobileOverlay } from '@/model/bew/BewMobileOverlay';
import { PersonSilhouette } from './PersonSilhouette';
import { BewLighting } from './BewLighting';
import { TheRoom } from './TheRoom';
import { AnalogModalScreen } from './AnalogModalScreen';
import { BewPhysicsScene } from './BewPhysicsScene';
import { PhysicalWall } from './PhysicalWall';
import { Box } from '@react-three/drei';


export const BewGame = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [focusLevel, setFocusLevel] = useState(0);
  const focusStageRef = useRef<any>(0);
  const [enableLocked, setEnableLocked] = useState(true)
  const [initialPosition, setInitialPosition] = useState<[number, number, number]>([-1.5, 0, 1])
  const [currentPosition, setCurrentPosition] = useState<[number, number, number]>([0, 0, 1]);
  const [playerRotation, setPlayerRotation] = useState({ x: 0, y: 0, z: 0 })
  const [isLocked, setIsLocked] = useState(false)
  const [teleportTrigger, setTeleportTrigger] = useState(0);
  const [showCodeInput, setShowCodeInput] = useState(false);

  const [code1, setCode1] = useState("")
  const [code2, setCode2] = useState("")
  const [code3, setCode3] = useState("")


  const [viewType, setViewType] = useState<'object' | 'entity' | 'place' | 'entity'>('object')
  const [naturality, setNaturality] = useState<number>(0)
  const [temperature, setTemperature] = useState<number>(0)
  

  

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  // Handle trigger collision
  const handleTriggerCollision = useCallback((event: any) => {
    // alert("You've triggered a collision event!");
    console.log("You've triggered a collision event!");
    focusStageRef.current = focusStageRef.current +1
    setFocusLevel((prev) => prev + 1)
    // setEnableLocked(false)
    // setIsLocked(true)
    // setInitialPosition([0, 1, 3])
    // document.pointerLockElement && document.exitPointerLock()
  }, []);

  // Callback to get player rotation from physics scene
  const handlePlayerRotationUpdate = useCallback((rotation: { x: number, y: number, z: number }) => {
    setPlayerRotation(rotation);
  }, []);

  // Handle teleporting the player to a new position
  const handleSetPlayerPosition = useCallback((position: [number, number, number]) => {
    console.log("Setting player position to:", position);
    setCurrentPosition(position);
    // Trigger a teleport by incrementing the counter
    setTeleportTrigger(prev => prev + 1);
  }, []);

  // Effect to listen for code input visibility changes from PhysicalTrigger
  // useEffect(() => {
  //   const handleCodeInputDisplay = (event: CustomEvent) => {
  //     setShowCodeInput(true);
  //   };
    
  //   window.addEventListener('showCodeInput' as any, handleCodeInputDisplay);
    
  //   return () => {
  //     window.removeEventListener('showCodeInput' as any, handleCodeInputDisplay);
  //   };
  // }, []);

  // Handle code input submission
  const CODE_1 = "scanate"
  const CODE_2 = "sunstreak"
  const CODE_3 = "gondolawish"
  const handleCode1Submit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    console.log(inputValue)
    if (inputValue === CODE_1) {
      setCode1(inputValue)
    }
  };

  const handleCode2Submit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    console.log(inputValue)
    if (inputValue === CODE_2) {
      setCode2(inputValue)
    }
  };
  return (
    <div className='pos-abs top-0 left-0 w-100 h-100 flex-col'>

      <div className='pos-abs bottom-0 left-0 flex-col z-100 gap-1 pa-1 pb-2'>
      {!code1 && (<div className="flex-col" id="code1" style={{display:"none"}}>
        <label className='block pl-2 tx-altfont-8 tx-lg tx-white opaci-50'>Code 1:</label>
          <input className='w-100px tx-md tx-center py-1 bord-r-5' 
          style={{
            background:"#494644", 
          }}
           type="text" placeholder='C O D E   1' 
           onChange={handleCode1Submit}
          />
          </div>
          )}
          

{!code2 && (<div className="flex-col" id="code2" style={{display:"none"}}>
        <label className='block pl-2 tx-altfont-8 tx-lg tx-white opaci-50'>Code 2:</label>
          <input className='w-100px tx-md tx-center py-1 bord-r-5' 
          style={{
            background:"#494644", 
          }}
           type="text" placeholder='C O D E   2' 
           onChange={handleCode2Submit}
          />
          </div>
          )}


          
          
      </div>


      {focusLevel !== 0 && (
        <AnalogModalScreen 
          setEnableLocked={setEnableLocked}
          enableLocked={enableLocked}
          playerRotation={playerRotation}
          onClose={() => {
            setFocusLevel(0);
            focusStageRef.current = 0;
            setIsLocked(false);
          }}
        />
      )}
      <Canvas camera={{ fov: 125 }} shadows>

        <BewLighting />




        <Physics
          gravity={[0, -30, 0]}
          defaultContactMaterial={{ friction: 0.001, restitution: 0.2 }}
        >


          
          {/* CHAIR SUPERVISOR, only visible when focusStageRef.current === 0 */}
          {focusStageRef.current === 0 && ( <>
          <group position={[2, 0, -20]} rotation={[0, -.5, 0]} scale={[1, 1.1, 1]}>
            <PersonSilhouette />
          </group>
<PhysicalWall 
        visible={false}
        size={[1, 3, 0.5]}
        position={[2, 1.5, -20]} rotation={[0, 0, 0]}
              />
</>
          )}
    

          {/* HALLWAY */}
          <group position={[1.5, 0, -12]} rotation={[0, -.7, 0]} scale={[1, 1, 1]}>
            <PersonSilhouette />
          </group>
          
          {/* BEHIND THE DOOR */}
          <group position={[1, 0, -16]} rotation={[0, Math.PI, 0]} scale={[1, 1.25, 1]}>
          <PersonSilhouette />
          </group>

          <TheRoom onTriggerCollide={handleTriggerCollision} />













          {/* First Barrier */}
          {/* <Box args={[6,1,1]} position={[0,0,0]}>
            <meshStandardMaterial color="#000000" />
          </Box> */}














          <BewMainScene 
          code1={code1}
          code2={code2}
          setPlayerPosition={handleSetPlayerPosition} />




          
          <BewPhysicsScene
            playerHeight={1.8}
            playerRadius={0.4}
            moveSpeed={focusStageRef.current === 0 ? 8 : 0}
            jumpForce={focusStageRef.current === 0 ? 8 : 0}
            maxVelocity={focusStageRef.current === 0 ? 20 : 0}
            position={initialPosition}
            currentPosition={currentPosition}
            teleportTrigger={teleportTrigger}
            sceneObjects={[]}
            onExit={() => {
              console.log('onExit')
            }}
            isMobile={isMobileDevice}
            ballCount={0}
            // enableLocked={enableLocked}
            // setEnableLocked={setEnableLocked}
            isLocked={isLocked}
            setIsLocked={setIsLocked}
            onRotationUpdate={handlePlayerRotationUpdate} />
        </Physics>
      </Canvas>
      {isMobileDevice && <BewMobileOverlay />}
      <div id="crosshair" className='pos-fix top-50p left-50p opaci-10 noclick block bord-r-100'>+</div>
    </div>
  );
};





