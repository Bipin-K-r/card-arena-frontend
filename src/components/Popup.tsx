import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGame: () => Promise<void>;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onCreateGame }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>
          <button
            className="absolute top-0 right-0 mt-4 mr-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-lg">Create a Game Room</h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onCreateGame}
          >
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
