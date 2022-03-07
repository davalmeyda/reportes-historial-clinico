import { Card, Button } from "antd";
import React, { useRef } from "react";
import Cuerpo from "./cuerpo";
import ReactToPrint from "react-to-print";

const Reporte1 = () => {
  const pageStyle = `
		@page {
			margin: 15,
      size: landscape
		}

		@media all {
			.pagebreak {
			display: none;
			}
		}

		@media print {
			.pagebreak {
			page-break-before: always;
			}
		}
		`;
  const impresionRef = useRef();
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
          >
            <ReactToPrint
              pageStyle={pageStyle}
              trigger={() => <Button type="primary">Imprimir</Button>}
              content={() => impresionRef.current}
            />
          </div>
        </div>
      }
    >
      <Cuerpo impresion={impresionRef} />
    </Card>
  );
};

export default Reporte1;
