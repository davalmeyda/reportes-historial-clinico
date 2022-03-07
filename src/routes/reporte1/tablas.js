import { Table, Tag, Space, Row, Col, Pagination } from "antd";

const Tablas = (props) => {
  const { ano, meses, tipos, ordenes, compras, data: dataServidor } = props;

  const tiposOrdenados = tipos.sort((a, b) => a.key - b.key);

  const dataOrden = dataServidor[0];

  return (
    <div>
      <Row>
        {tiposOrdenados.map((tipo) => {
          let dat = null;
          dataOrden.forEach((element) => {
            if (element.cod_tipor === tipo.key) {
              dat = element;
            }
          });

          return (
            <Tipos
              titulo={tipo.titulo}
              ano={ano}
              meses={meses}
              data={dat}
            ></Tipos>
          );
        })}
      </Row>
    </div>
  );
};

const Tipos = (props) => {
  return (
    <Col xs={24}>
      <Row>
        <Titulo titulo={props.titulo}></Titulo>
      </Row>
      <Row>
        <Contenido
          ano={props.ano}
          meses={props.meses}
          data={props.data}
        ></Contenido>
      </Row>
    </Col>
  );
};

const Titulo = (props) => {
  return (
    <div style={{ paddingTop: 40 }}>
      <h3>{props.titulo}</h3>
    </div>
  );
};

const Contenido = (props) => {
  const { ano, meses: mesesDesordenado, data: dataServidor } = props;

  const meses = mesesDesordenado.sort((a, b) => a.orden - b.orden);

  const diccionario = {
    1: "numordens",
    2: "numeroordensr",
    3: "totalpacientes",
    4: "porcentajesc",
    5: "porcentajess",
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
      title: mes.value,
      dataIndex: mes.value,
      key: mes.value,
      align: "right",
    });
  });

  const data = [
    {
      key: 1,
      nombre: "Nro de ordenes",
      ano: ano,
    },
    {
      key: 2,
      nombre: "Nro ORDENES realizados",
      ano: ano,
    },
    {
      key: 3,
      nombre: "Total pacientes",
      ano: ano,
    },
    {
      key: 4,
      nombre: "% VERSUS ORDEN VS. CONCLUIDO",
      ano: ano,
    },
    {
      key: 5,
      nombre: "% VERSUS DE PACIENTE VS ORDENE COCNL",
      ano: ano,
    },
  ];

  if (dataServidor) {
    data.forEach((dato) => {
      meses.forEach((mes) => {
        const porcentaje = dato.key === 4 ? "%" : dato.key === 5 ? "%" : "";
        dato[mes.value] =
          dataServidor[mes.key + "_" + diccionario[dato.key]].toString() +
          porcentaje;
      });
    });
  }

  return <Table columns={columns} pagination={false} dataSource={data} />;
};

export default Tablas;
