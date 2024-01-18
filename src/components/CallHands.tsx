import { useState } from "react";
import Button from "./Button";
import { CallHandsGame } from "../services/Socket";

const CallHands = () => {
  const [hands, setHands] = useState<any>();
  const callHands = async (hands?: number) => {
    try {
      console.log('Hands called: ', hands);
      CallHandsGame(hands);
    } catch (error) {
      console.error('Error calling hands:', error);
    }
  };
  return (
    <div className="text-box w-72">
      <input
        className="border border-gray-400 rounded px-4 mb-4 justify-center"
        placeholder="No. of Hands"
        value={hands}
        onChange={(e) => setHands(e.target.value)}
      ></input>
      <Button
        onClick={() => callHands(hands)}
        text="Call Hands">
      </Button>
    </div>
  );
};

export default CallHands;