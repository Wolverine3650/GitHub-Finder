import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        &nbsp; {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>HOME</Link>
        </li>
        <li>
          <Link to='/About'>ABOUT</Link>
        </li>
      </ul>
    </nav>
  );
};
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
export default Navbar;
