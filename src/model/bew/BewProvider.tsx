import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for severity
type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

// Define the context type
type BewContextType = {
  testdata: string;
  isSnackbarOpen: boolean;
  snackbarMessage: string;  
  snackbarSeverity: SnackbarSeverity;
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
  closeSnackbar: () => void; // Renamed for clarity
  isCutSceneOpen: boolean;
  setIsCutSceneOpen: (isCutSceneOpen: boolean) => void;
};

// Create the context with default values
const BewContext = createContext<BewContextType | undefined>(undefined);

// Custom hook to use the Bew context
export const useBew = () => {
  const context = useContext(BewContext);
  if (context === undefined) {
    throw new Error('useBew must be used within a BewProvider');
  }
  return context;
};


// Provider component
export const BewProvider = ({ children }: { children: ReactNode }) => {
  const [isCutSceneOpen, setIsCutSceneOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('info');


  const showSnackbar = (message: string, severity: SnackbarSeverity) => {
    console.log('showSnackbar: message is', message, 'severity is', severity);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setIsSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
    // Optionally reset message and severity after closing animation (if any)
    // setTimeout(() => {
    //   setSnackbarMessage('');
    //   setSnackbarSeverity('info');
    // }, 300); // Adjust timing based on animation
  };

  // Add state and functions for the context here later
  const contextValue: BewContextType = {
    // Provide context values here
    isCutSceneOpen,
    setIsCutSceneOpen,
    testdata: "testdata",
    isSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  };

  console.log('BewProvider: contextValue is', contextValue); // Keep for debugging if needed

  return (
    <BewContext.Provider value={contextValue}>
      <SnackbarNotif />
      {children}
    </BewContext.Provider>
  );
};

export const SnackbarNotif = () => {
  const { isSnackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useBew();

  if (!isSnackbarOpen) {
    return null;
  }

  // Basic styling for visibility - replace with actual Snackbar component later
  const style: React.CSSProperties = {
    backgroundColor: snackbarSeverity === 'error'
    ? '#ff5555'
    : snackbarSeverity === 'success'
      ? '#55ff55'
      : snackbarSeverity === 'warning'
        ? '#ffaa55'
        : '#55aaff',
    zIndex: 1000, // Ensure it's above other content
  };

  return (
    <div  className="tx-lx pa-4 pos-fix top-0 right-0 flex-col z-1000 w-200px hover-4">
      <PaperSheet>{snackbarMessage}</PaperSheet>
      {/* <button className="tx-white pointer pl-3 tx-mdl noborder bg-trans" onClick={closeSnackbar} >&times;</button> */}
      {/* Simple close button */}
    </div>
  );
}

const PaperSheet = ({ children }: { children: ReactNode }) => {
  return (
    
    <div className='px-2 pt-2 pb-1 z-100 tx-altfont-8'
    style={{
      transform: "rotate(-8deg)",
      clipPath: "polygon(50% 0%, 100% 0, 98% 60%, 100% 97%, 4% 100%, 0% 60%, 2% 3%)",
      background: "linear-gradient(0deg, #706C61, #8F8B7D, #605C51)",
    }}
    >
      {children}
    </div>
  );
}


