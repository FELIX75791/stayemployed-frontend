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
	// const navigate = useNavigate();
	const handleClickOpen = () => {
		setOpen(true);
		// navigate('/UploadData');
  };
  const handleClose = () => {
		setOpen(false);
	};
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/JobSearch" >
                        Search Job
                    </NavLink>
                    <NavLink to="/Applications" activeStyle>
                        Applications
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
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