import { PlusSquareOutlined } from "@ant-design/icons";
import { Table, Tag, Space, Row, Col, Pagination, Divider, Button } from "antd";
import { useState } from "react";

const Tablas = (props) => {
  const {
    ano,
    meses: mesesDesordenado,
    especialidades: especialidadesOrdenados,
    data: dataServidor,
  } = props;

  const especialidades = especialidadesOrdenados.sort((a, b) => a.key - b.key);
  const meses = mesesDesordenado.sort((a, b) => a.orden - b.orden);

  const diccionario = {
    1: "ordenesventa",
    2: "montoventa",
  };

  const columns = [
    {
      title: "",
      dataIndex: "nombre",
      key: "nombre",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "AÑO",
      dataIndex: "ano",
      key: "ano",
    },
  ];

  meses.forEach((mes) => {
    columns.push({
      title: "ORD. VEND.",
      dataIndex: mes.key + "orden",
      key: mes.key + "orden",
      align: "right",
    });
    columns.push({
      title: mes.value,
      dataIndex: mes.value,
      key: mes.value,
      align: "right",
    });
    columns.push({
      title: "",
      dataIndex: mes.value + "detalles",
      key: mes.value + "detalles",
      align: "center",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                console.log("ESPECIALIDAD: ", record.key);
                console.log("MES: ", mes.orden.toString().padStart(2, "0"));
                console.log("AÑO: ", ano);
              }}
              icon={<PlusSquareOutlined />}
            />
          </div>
        );
      },
    });
  });

  const data = [];

  const totales = {};

  especialidades.forEach((especialidad) => {
    console.log(especialidad);
    const campos = {};
    if (dataServidor.length > 0) {
      console.log(dataServidor);
      meses.forEach((mes, index) => {
        const ddd = dataServidor.filter(
          (dato) => dato.codigo_especialidad === especialidad.key
        );

        if (ddd.length > 0) {
          campos[mes.value] =
            "S/. " +
            parseFloat(ddd[0][mes.key + "_" + diccionario[2]]).toFixed(2);
          campos[mes.key + "orden"] = ddd[0][mes.key + "_" + diccionario[1]];
          totales[mes.value] =
            (totales[mes.value] ? totales[mes.value] : 0) +
            parseFloat(ddd[0][mes.key + "_" + diccionario[2]]);
        } else {
          campos[mes.value] = "";
          campos[mes.key + "orden"] = "";
        }
      });
    }

    data.push({
      key: especialidad.key,
      nombre: especialidad.titulo,
      ano: ano,
      ...campos,
    });
  });

  for (const key in totales) {
    if (Object.hasOwnProperty.call(totales, key)) {
      let element = totales[key];
      totales[key] = "S/. " + parseFloat(element).toFixed(2);
    }
  }

  data.push({
    key: "total",
    nombre: "TOTAL",
    ...totales,
  });

  console.log(totales);

  return (
    <div>
      <Row>
        <Titulo titulo={"Atencion de espcialidades por mes"}></Titulo>
      </Row>
      <Row>
        <Table columns={columns} pagination={false} dataSource={data} />
      </Row>
    </div>
  );
};

const Titulo = (props) => {
  return (
    <div style={{ width: "100%", marginTop: 10 }}>
      <Divider></Divider>
      <div style={{ paddingTop: 30, paddingBottom: 10 }}>
        <h3
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            fontWeight: 400,
            backgroundColor: "#F9E4B7",
          }}
        >
          {props.titulo.toUpperCase()}
        </h3>
      </div>
    </div>
  );
};

export default Tablas;
