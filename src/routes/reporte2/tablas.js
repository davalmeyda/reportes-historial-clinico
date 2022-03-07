import { Table, Tag, Space, Row, Col, Pagination, Divider } from "antd";

const Tablas = (props) => {
  const {
    ano,
    meses: mesesDesordenado,
    tipos: tiposOrdenados,
    data: dataServidor,
  } = props;

  const tipos = tiposOrdenados.sort((a, b) => a.key - b.key);
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
  });

  const data = [
    // {
    //   key: 1,
    //   nombre: "consulta externa",
    //   ano: ano,
    // },
  ];

  // if (dataServidor) {
  //   columns.forEach((columna, index) => {
  //     if (index > 1) {
  // 			data.push({
  // 				key: index,

  // 			});
  //     }
  //   });
  // }

  // if (dataServidor) {
  //   data.forEach((dato) => {
  //     meses.forEach((mes) => {
  //       const porcentaje = dato.key === 4 ? "%" : dato.key === 5 ? "%" : "";
  //       dato[mes.value] =
  //         dataServidor[mes.key + "_" + diccionario[dato.key]].toString() +
  //         porcentaje;
  //     });
  //   });
  // }

  tipos.forEach((tipo) => {
    console.log(tipo);
    const campos = {};
    meses.forEach((mes, index) => {
      campos[mes.value] = dataServidor.filter(
        (dato) => dato.cod_tipor === tipo.key
      )[0][mes.key + "_" + diccionario[2]];
      campos[mes.key + "orden"] = dataServidor.filter(
        (dato) => dato.cod_tipor === tipo.key
      )[0][mes.key + "_" + diccionario[1]];
    });

    console.log(campos);

    data.push({
      key: tipo.key,
      nombre: tipo.titulo,
      ano: ano,
      ...campos,
    });
  });

  return (
    <div>
      <Row>
        <Titulo titulo={"Ingresos por linea de negocio VENTA"}></Titulo>
      </Row>
      <Row>
        <Table columns={columns} pagination={false} dataSource={data} />
      </Row>
    </div>
  );
};

const Tipos = (props) => {
  const { titulo, ano, meses, data } = props;
  return (
    <Col xs={24}>
      <Row>
        <Titulo titulo={titulo}></Titulo>
      </Row>
      <Row>
        <Contenido ano={ano} meses={meses} data={data}></Contenido>
      </Row>
      <Row></Row>
    </Col>
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

const Contenido = (props) => {
  const { ano, meses: mesesDesordenado, data: dataServidor } = props;

  const meses = mesesDesordenado.sort((a, b) => a.orden - b.orden);

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
      title: mes.value,
      dataIndex: mes.value,
      key: mes.value,
      align: "right",
    });
  });

  const data = [
    {
      key: 1,
      nombre: "consulta externa",
      ano: ano,
    },
    {
      key: 2,
      nombre: "laboratorio",
      ano: ano,
    },
    {
      key: 3,
      nombre: "ecografia",
      ano: ano,
    },
  ];

  // if (dataServidor) {
  //   data.forEach((dato) => {
  //     meses.forEach((mes) => {
  //       const porcentaje = dato.key === 4 ? "%" : dato.key === 5 ? "%" : "";
  //       dato[mes.value] =
  //         dataServidor[mes.key + "_" + diccionario[dato.key]].toString() +
  //         porcentaje;
  //     });
  //   });
  // }

  return <Table columns={columns} pagination={false} dataSource={data} />;
};

export default Tablas;
