import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Breathing from "./pages/Breathing";
import Playgames from "./pages/Playgames";

import "./App.css"; 

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Router>
      <nav className="navbar">
        <ul className="mynav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>

          <li className="nav-item">
            <a href="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/04/20/20250304201104-D7QUHHCH.json" 
               className="nav-link" 
               target="_blank" 
               rel="noopener noreferrer">
              Chatbot
            </a>
          </li>

          <li className="nav-item">
            <Link to="/tools" className="nav-link">Tools</Link>
          </li>

          {/* ✅ Community Support Dropdown */}
          <li 
            className="nav-item dropdown" 
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="nav-link">Community Support ▾</span>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="http://localhost:7001" className="dropdown-item">Anonymous Chat</Link>
                </li>
                <li>
                  <Link to="http://localhost:5555" className="dropdown-item">Posts</Link>
                </li>
                <li>
                  <Link to="http://localhost:4000" className="dropdown-item">Journal</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Games />} />
          <Route path="/tools/breathing" element={<Breathing />} />
          <Route path="/tools/playgames" element={<Playgames />} />
          {/* <Route path="/tools/playmusic" element={<Playmusic />} /> */}
  

          {/* ✅ New Routes */}
          {/* <Route path="/anonymous-chat" element={<AnonymousChat />} />
          <Route path="/posts" element={<Posts />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
