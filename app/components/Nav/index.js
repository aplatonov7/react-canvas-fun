import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './styles.scss';

class Nav extends Component {
  render() {
    return (
      <nav className="site-nav">
        <li className="site-nav__element"><Link activeClassName="active" className="site-nav__link" to="/home">Home</Link></li>
        <li className="site-nav__element"><Link activeClassName="active" className="site-nav__link" to="/paint">Paint</Link></li>
        <li className="site-nav__element"><Link activeClassName="active" className="site-nav__link" to="/life">Life</Link></li>
      </nav>
    );
  }
}

export default Nav;
