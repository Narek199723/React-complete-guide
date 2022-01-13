import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/store/authContext";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);

    const logoutHandler = () => {
        logout();
    };
    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>React Auth</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to="/auth">Login</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <Fragment>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
