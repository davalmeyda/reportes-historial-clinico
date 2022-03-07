import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}inicio`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}reporte1`} component={asyncComponent(() => import('./reporte1'))}/>
    </Switch>
  </div>
);

export default App;
