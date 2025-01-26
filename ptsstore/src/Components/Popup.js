import React from "react";
import "../CSS/Popup.css"; // For styling the popup

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      {/* Ensure "X" button is accessible and functional */}
   
      <div className="popup">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
      </div>
  );
};

export default Popup;
