import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Router, Route, browserHistory } from 'react-router';

import CoreLayout from './layouts/CoreLayout/CoreLayout';
import HomeView from './views/HomeView/HomeView';
import PaintView from './views/PaintView/PaintView';
import LifeView from './views/LifeView/LifeView';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={CoreLayout}>
            <Route path="home" component={HomeView} />
            <Route path="paint" component={PaintView} />
            <Route path="life" component={LifeView} />
            <Redirect from="*" to="home" />
        </Route>
    </Router>
    , document.getElementById('app'));