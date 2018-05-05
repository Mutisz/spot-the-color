import React from "react";
import GameMenu from "./GameMenu";
import GamePanel from "./GamePanel";
import GameFooter from "./GameFooter";
import "./App.css";

const App = () => [
  <div key="GameHeader" className="header">
    <h1>SPOT THE COLOR</h1>
  </div>,
  <GameMenu key="GameMenu" />,
  <GamePanel key="GamePanel" />,
  <GameFooter key="GameFooter" />
];

export default App;
