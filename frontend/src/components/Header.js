import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { authActions, logout } from "../features/auth/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(authActions.reset());
        navigate('/');
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">e-Helpdesk</Link>
            </div>
            <ul>
                {!user &&
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt />
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUserAlt />
                                Register
                            </Link>
                        </li>
                    </>
                }
                {user &&
                    <>
                        <li>
                            <button className="btn" onClick={logoutHandler}>
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </li>
                    </>
                }

            </ul>
        </header>
    );
};

export default Header;
