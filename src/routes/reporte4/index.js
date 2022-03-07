import { Card, Button } from "antd";
import React, { useRef, useState } from "react";
import Cuerpo from "./cuerpo";
import ReactToPrint from "react-to-print";
import ModalDetalles from "./modal";

const Reporte4 = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [datosModal, setDatosModal] = useState(null);
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
            Atencion de espcialidades por mes
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
      <Cuerpo
        setAbrirModal={setAbrirModal}
        setDatosModal={setDatosModal}
        impresion={impresionRef}
      />
      {abrirModal ? (
        <ModalDetalles
          abrirModal={abrirModal}
          setAbrirModal={setAbrirModal}
          datosModal={datosModal}
        />
      ) : null}
    </Card>
  );
};

export default Reporte4;
