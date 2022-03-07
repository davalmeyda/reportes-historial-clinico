import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}reporte1`} component={asyncComponent(() => import('./reporte1'))}/>
      <Route path={`${match.url}reporte2`} component={asyncComponent(() => import('./reporte2'))}/>
      <Route path={`${match.url}reporte3`} component={asyncComponent(() => import('./reporte3'))}/>
      <Route path={`${match.url}reporte4`} component={asyncComponent(() => import('./reporte4'))}/>
      <Route path={`${match.url}powerBi`} component={asyncComponent(() => import('./powerBi'))}/>
    </Switch>
  </div>
);

export default App;
