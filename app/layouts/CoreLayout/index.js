import '../../styles/core.scss';
import './styles.scss';
import React, { PropTypes } from 'react';
import Nav from '../../components/Nav';

function CoreLayout ({ children }) {
    return (
        <div className='page-container'>
          <Nav />
          {children}
        </div>
    )
}

CoreLayout.propTypes = {
    children: PropTypes.element
};

export default CoreLayout;