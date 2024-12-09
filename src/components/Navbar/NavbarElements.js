import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #5060FF; /* Modern blue background */
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 12;
`;

export const NavLink = styled(Link)`
    color: #fff; /* White text for links */
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 15px;
    height: 100%;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s ease;

    &.active {
        color: #FFD700; /* Highlight active links in gold */
    }

    &:hover {
        color: #FFD700; /* Same hover effect as active links */
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: white;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtn = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 25px;
    background: #FFD700; /* Gold background for buttons */
    padding: 10px 20px;
    color: #000000; /* Black text for contrast */
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;

    &:hover {
        background: #E6BE00; /* Darker gold on hover */
        color: #fff; /* White text on hover */
    }
`;

export const LogoutBtnLink = styled.button`
    border-radius: 25px;
    background: #FF6B6B; /* Red for logout */
    padding: 10px 20px;
    color: #fff; /* White text */
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-size: 14px;
    font-weight: 600;

    &:hover {
        background: #D9534F; /* Slightly darker red on hover */
    }
`;
