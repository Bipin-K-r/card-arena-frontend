import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import Judgement from "./pages/Judgement";
import Show from "./pages/Show";
import Bluff from "./pages/Bluff";
import ErrorPage from "./pages/ErrorPage";
import GameTable from "./pages/GameTable";
import JoinGameTable from "./pages/JoinGameTable";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/judgement" element={<Judgement />} />
            <Route path="/game/:gameId" element={<GameTable />} />
            <Route path="/game/:gameId/join" element={<JoinGameTable />} />
            <Route path="/show" element={<Show />} />
            <Route path="/bluff" element={<Bluff />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
