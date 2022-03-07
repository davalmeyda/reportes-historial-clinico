import React from "react";
import { Route, Switch } from "react-router-dom";
import GeneralVenta from "./generalVenta";
import EspecialidadDetallado from "./especialidadDetallado";
import EspecialidadAcumulado from "./especialidadAcumulado";

const Maestro = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/generalVenta`} component={GeneralVenta} />
    <Route
      path={`${match.url}/especialidadDetallado`}
      component={EspecialidadDetallado}
    />
    <Route
      path={`${match.url}/especialidadAcumulado`}
      component={EspecialidadAcumulado}
    />
  </Switch>
);

export default Maestro;
