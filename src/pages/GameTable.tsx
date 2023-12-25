import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Define a seat object structure
interface Seat {
  id: number;
  name: string;
}

const GameTable: React.FC = () => {
  const location = useLocation();
  const token = location.state?.token;
  const [seats, setSeats] = useState<Seat[]>([
    { id: 1, name: '' },
    { id: 2, name: '' },
    { id: 3, name: '' },
    { id: 4, name: '' },
  ]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [name, setName] = useState<string>('');

  const handleSeatClick = (seatNumber: number) => {
    const seat = seats.find((seat) => seat.id === seatNumber);
    if (seat && !seat.name) {
      setSelectedSeat(seatNumber);
    }
  };

  const handleTakeSeat = async () => {
    if (selectedSeat) {
      const updatedSeats = seats.map((seat) =>
        seat.id === selectedSeat ? { ...seat, name: name } : seat
      );
      setSeats(updatedSeats);

      try {
        const response = await fetch('/api/take-seat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gameRoomToken: token,
            seatId: selectedSeat,
            playerName: name,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // actions based on the backend response can be added here

      } catch (error) {
        console.error('There was an error taking the seat:', error);
      }

      setSelectedSeat(null);
      setName('');
    }
  };

  return (
    <div className="relative w-full h-screen">
    {seats.map((seat) => (
      <div
        key={seat.id}
        className={`absolute ${seat.id % 2 === 0 ? 'bottom-10' : 'top-10'} ${seat.id > 2 ? 'right-10' : 'left-10'}`}
      >
        <button
          onClick={() => handleSeatClick(seat.id)}
          className={`seat p-4 rounded-lg shadow-lg transition-colors duration-300 ${seat.name ? 'bg-white text-black' : 'bg-gray-500'}`}
          disabled={!!seat.name}
        >
          {seat.name || `Seat ${seat.id}`}
        </button>
      </div>
    ))}

      {/* Game Token Display */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow">
        Game Room: {token}
      </div>

      {/* Popup for taking a seat */}
      {selectedSeat !== null && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="seat-popup bg-white p-4 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border p-2 w-full"
              />
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded w-full"
              onClick={handleTakeSeat}
            >
              TAKE THE SEAT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameTable;
