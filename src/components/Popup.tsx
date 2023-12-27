// Popup.tsx
import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGame: () => Promise<void>;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onCreateGame }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        <div className="text-right">
          <button onClick={onClose} className="text-black hover:text-gray-700">
            Close
          </button>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold mb-4">Create a Game Room</h2>
          {/* Get player name from user */}
          <input
            className="border border-gray-400 rounded px-4 py-2 mb-4"
            placeholder="Enter your name"></input>
          <button
            onClick={onCreateGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
