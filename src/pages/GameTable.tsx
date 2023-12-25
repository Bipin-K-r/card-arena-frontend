import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const GameTable: React.FC = () => {
  const location = useLocation();
  const token = location.state?.token;
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [name, setName] = useState<string>(""); 

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeat(seatNumber);
  };

  const handleTakeSeat = () => {
    console.log(`Name: ${name} has taken seat ${selectedSeat}`);
    // Implement logic here after taking a seat.
    // update the state to indicate that the seat is taken.
    // Reset selected seat and name after taking the seat
    setSelectedSeat(null);
    setName("");
  };

  return (
    <div className="relative w-full h-screen ">
      {/* Seat Positions */}
      <div className="absolute top-10 left-10">
        <button onClick={() => handleSeatClick(1)} className="seat bg-white p-4 rounded-lg shadow-lg">
          Seat 1
        </button>
      </div>
      <div className="absolute bottom-10 left-10">
        <button onClick={() => handleSeatClick(2)} className="seat bg-white p-4 rounded-lg shadow-lg">
          Seat 2
        </button>
      </div>
      <div className="absolute top-10 right-10">
        <button onClick={() => handleSeatClick(3)} className="seat bg-white p-4 rounded-lg shadow-lg">
          Seat 3
        </button>
      </div>
      <div className="absolute bottom-10 right-10">
        <button onClick={() => handleSeatClick(4)} className="seat bg-white p-4 rounded-lg shadow-lg">
          Seat 4
        </button>
      </div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow">
        Game Room: {token}
      </div>

      {selectedSeat !== null && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="seat-popup bg-white p-4 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border p-2 w-full"
              />
            </div>
            <button className="bg-green-500 text-white p-2 rounded w-full" onClick={handleTakeSeat}>
              TAKE THE SEAT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameTable;
