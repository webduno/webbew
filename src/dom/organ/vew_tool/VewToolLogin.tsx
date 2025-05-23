'use client';
import { NavigationHeaderBar } from '@/dom/bew/NavigationHeaderBar';
import { random10CharString } from '../../../../script/utils/platform/random10CharString';
import { GameState } from '@/app/(tool)/tool/page';
import { VersionTag } from '../../bew/VersionTag';

export interface InitialToolLoginProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  typedUsername: string;
  setTypedUsername: (username: string) => void;
  isLoading: boolean;
  handleStart: () => void;
  sanitizePlayerId: (id: string) => string;
  defaultImage?: string;
  defaultImageOverlay?: string;
  titleNode?: React.ReactNode;
}
export const VewToolLogin: React.FC<InitialToolLoginProps> = ({
  defaultImage = '/bew/cleaneyes.png',
  defaultImageOverlay = '/bew/starsbg2.jpeg',
  titleNode = <div className='tx-center tx-lgx landing -title'>Gamified <br /> step-by-step lessons for remote viewing</div>,
  gameState, setGameState, typedUsername, setTypedUsername, isLoading, handleStart, sanitizePlayerId
}) => {
  const version = process.env.VEW_PUBLIC_VERSION 
  return (
    <>
      <NavigationHeaderBar linkList={<>
        <a href="/about" className='nodeco' style={{ color: "#AFAFAF" }}>
          <div>About <VersionTag /></div>
        </a>
      </>} />
      <div className='flex-wrap gap-8 px-4 '
        style={{
          minHeight: "70vh",
        }}
      >
        <div className='flex-col '

        >
          <div className='Q_xs_sm py-4'></div>


          <img src={defaultImage}
            onClick={() => {
              setGameState('playing');
            }}
            style={{}}
            alt="tool_bg2" className='pointer hover-jump pos-abs noverflow block w-150px Q_xs_pt-8' />



          <img src={defaultImageOverlay}
            onClick={() => {
              setGameState('playing');
            }}
            style={{}}
            alt="tool_bg1" className='pointer bord-r-50 noverflow block w-250px' />

        </div>
        <div className=' tx-altfont-2 tx-bold gap-4 pb-8 flex-col w-300px'
          style={{
            color: "#777777",
          }}
        >
          {titleNode}
          <div className='flex-col '>
            <div>
              <input
                type="text"
                className='bord-r-10 border-gg tx-altfont-2 py-2 mb-2 px-3 tx-center'
                placeholder='Enter your name'
                style={{
          background: "#f7f7f7",
                }}
                value={typedUsername}
                onChange={(e) => { setTypedUsername(sanitizePlayerId(e.target.value)); }}
                onKeyDown={(e) => {
                  if (!typedUsername) {
                    return;
                  }
                  if (e.key === "Enter") {
                    handleStart();
                  }
                }} />
            </div>
            <div
              className='py-2 px-8 tx-center tx-white bord-r-15 tx-lgx opaci-chov--75'
              onClick={isLoading ? undefined : () => {
                if (!typedUsername) {
                  const randomId = random10CharString();
                  setTypedUsername(randomId);
                  localStorage.setItem('VB_PLAYER_ID', randomId);
                  window.location.reload();
                  return;
                }
                handleStart();
              }}
              style={{
                backgroundColor: isLoading ? "#cccccc" : "#807DDB",
                boxShadow: isLoading ? "0px 4px 0 0px #999999" : "0px 4px 0 0px #6B69CF",
              }}
            >
              {isLoading ? "Loading..." : "Start"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
