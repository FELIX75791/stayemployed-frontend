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

const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <NavLink to="/Profile"> {/* Add Profile Option */}
                        Profile
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/LogIn" onClick={handleClickOpen}>
                        Log In / Sign up
                    </NavBtnLink>
                    <LogIn open={open} handleClose={handleClose} />
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
