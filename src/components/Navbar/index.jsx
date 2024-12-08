import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
import LogIn from "../LogIn";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate(); // For navigation after logout

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        // Clear the JWT token from localStorage
        localStorage.removeItem("authToken");

        // Redirect the user to the login page
        navigate("/login");
    };

    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/" >
                        Dashboard
                    </NavLink>
                    <NavLink to="/JobSearch" >
                        Search Job
                    </NavLink>
                    <NavLink to="/Applications">
                        Track Applications
                    </NavLink>
                    <NavLink to="/Profile">
                        Profile
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    {/* Log In / Sign Up Button */}
                    <NavBtnLink to="/LogIn" onClick={handleClickOpen}>
                        Log In / Sign up
                    </NavBtnLink>
                    <LogIn open={open} handleClose={handleClose} />

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            padding: "10px 20px",
                            cursor: "pointer",
                            marginLeft: "10px",
                        }}
                    >
                        Log Out
                    </button>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
