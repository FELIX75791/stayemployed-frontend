import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import JobSearch from "./pages/JobSearch";
import Applications from "./pages/Applications";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/JobSearch" element={<JobSearch />} />
                <Route
                    path="/Applications"
                    element={<Applications />}
                />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;