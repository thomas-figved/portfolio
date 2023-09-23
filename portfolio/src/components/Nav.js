import {React} from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink 
            to="/" 
            className={({ isActive, isPending }) =>
                isPending ? "nav__link nav__link--pending" : isActive ? "nav__link  nav__link--active" : "nav__link"
            }
          >
            About me
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/resume"
            className={({ isActive, isPending }) =>
              isPending ? "nav__link nav__link--pending" : isActive ? "nav__link nav__link--active" : "nav__link"
            }
          >
            Resume
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/works"
            className={({ isActive, isPending }) =>
              isPending ? "nav__link nav__link--pending" : isActive ? "nav__link nav__link--active" : "nav__link"
            }
          >
            Works
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav