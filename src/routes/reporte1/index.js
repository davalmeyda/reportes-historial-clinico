import { Card } from "antd";
import React from "react";
import Cuerpo from "./cuerpo";

const Reporte1 = () => {
  return (
    <Card
      title={
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "1fr",
            gridColumnGap: "0px",
            gridRowGap: "0px",
            marginRight: "5%",
          }}
        >
          <div
            style={{
              gridArea: "1 / 1 / 2 / 2",
              fontSize: "22px",
              paddingTop: "20px",
            }}
          >
            Analisis de Ordenes y Pacientes vs Concluidos
          </div>
          <div
            style={{
              gridArea: "1 / 2 / 2 / 3",
              display: "flex",
              flexDirection: "row-reverse",
              paddingTop: "15px",
            }}
          ></div>
        </div>
      }
    >
      <Cuerpo></Cuerpo>
    </Card>
  );
};

export default Reporte1;
