import '../../styles/core.scss';
import './CoreLayout.scss';
import React, { PropTypes } from 'react';
import Nav from '../../components/Nav/Nav';

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