
require("./styles/app.scss")

///////////////////////
// var React = require("react")
// var ReactDOM = require('react-dom')

import RootComponent from './scripts/components/RootComponent'

import {Router,Route,hashHistory,IndexRedirect,IndexRoute} from 'react-router'
import WaiMaiComponent from './scripts/components/WaiMaiComponent'
import FinderComponent from './scripts/components/FinderComponent'
import OrderComponent from './scripts/components/OrderComponent'
import MineComponent from './scripts/components/MineComponent'
import PositionComponent from './scripts/components/PositionComponent'

// {/* <IndexRedirect to="/main"/> */}
ReactDOM.render(
    
    <Router history={hashHistory}>
        <Route path="/" component={RootComponent}>
            
            <IndexRoute component={WaiMaiComponent}/>
            <Route path="/waimai" component={WaiMaiComponent}></Route>
            <Route path="/finder" component={FinderComponent}></Route>
            <Route path="/order" component={OrderComponent}></Route>
            <Route path="/mine" component={MineComponent}></Route>
            <Route path="/position" component={PositionComponent}></Route>
            <Route path="*" component={WaiMaiComponent}></Route>

        </Route>
    </Router>
    
    ,document.getElementById("app"))