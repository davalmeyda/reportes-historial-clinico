import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import { tablasPrincipales } from "../constants/TablasPrincipales";
import { httpClient } from "../util/Api";

const App = ({ match }) => {
  const [dataPrincial, setDataPrincial] = useState(false);

  useEffect(() => {
    traerDataPrincial();
  }, []);

  const traerDataPrincial = async () => {
    const response = await httpClient.post("reportes/getTablasPrimarias");
    console.log(response.data.data);
    tablasPrincipales.TablasPrincipales = response.data.data;
    setDataPrincial(true);
  };

  return (
    <div className="gx-main-content-wrapper">
      {dataPrincial ? (
        <Switch>
          <Route
            path={`${match.url}reporte1`}
            component={asyncComponent(() => import("./reporte1"))}
          />
          <Route
            path={`${match.url}reporte2`}
            component={asyncComponent(() => import("./reporte2"))}
          />
          <Route
            path={`${match.url}reporte3`}
            component={asyncComponent(() => import("./reporte3"))}
          />
          <Route
            path={`${match.url}reporte4`}
            component={asyncComponent(() => import("./reporte4"))}
          />
          <Route
            path={`${match.url}powerBi`}
            component={asyncComponent(() => import("./powerBi"))}
          />
        </Switch>
      ) : null}
    </div>
  );
};

export default App;
