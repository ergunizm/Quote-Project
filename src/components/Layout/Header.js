import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userActions } from "../../store/user-slice";

import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const logoutHandler = () => {
    // could make notification for logging out
    dispatch(userActions.logout());
  };

  return (
    <header className={styles.header}>
      <h1>Logo</h1>
      <nav>
        {isAuthenticated && (
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="new-quote"
              >
                New Quote
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="profile"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink onClick={logoutHandler} to="/">
                Logout
              </NavLink>
            </li>
          </ul>
        )}
        {!isAuthenticated && (
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
