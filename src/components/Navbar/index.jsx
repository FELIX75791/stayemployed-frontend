import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    LogoutBtnLink,
} from "./NavbarElements";
import LogIn from "../LogIn";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
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
                    <NavBtnLink to="/LogIn" onClick={handleClickOpen}>
                        Log In / Sign up
                    </NavBtnLink>
                    <LogIn open={open} handleClose={handleClose} />

                    <LogoutBtnLink onClick={handleLogout}>
                        Log Out
                    </LogoutBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
