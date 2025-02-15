import { createContext, useState } from "react";

export const showToastContext = createContext([null, () => {}]);

export const ShowToastProvider = ({ children }) => {
  const [showToastMsg, setShowToastMsg] = useState(null);
  
  return (
    <showToastContext.Provider value={[showToastMsg, setShowToastMsg]}>
      {children}
    </showToastContext.Provider>
  );
};
