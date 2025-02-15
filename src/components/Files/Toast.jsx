import React, { useContext, useEffect } from 'react';
import { showToastContext } from '../../context/ShowToastContext';

function Toast() {
  const [showToastMsg, setShowToastMsg] = useContext(showToastContext);

  useEffect(() => {
    if (showToastMsg) {
      setTimeout(() => {
        setShowToastMsg(null); // Clear the toast message after 2 seconds
      }, 2000);
    }
  }, [showToastMsg, setShowToastMsg]);

  //console.log(showToastMsg);  // Check if the message is being updated

  //if (!showToastMsg) return null; // Do not render toast if there's no message

  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{showToastMsg}</span>
      </div>
    </div>
  );
}

export default Toast;
