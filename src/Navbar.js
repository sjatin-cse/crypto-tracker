import React from "react";
import "./Navbar.css";

const Navbar = ({ toggleDarkMode, darkMode }) => {
    return (
        <nav className={`navbar ${darkMode ? "dark" : ""}`}>
            <div className="nav-title">Crypto Tracker</div>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
        </nav>
    );
};

export default Navbar;
