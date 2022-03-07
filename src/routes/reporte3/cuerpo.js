import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Row, Col, Select, Checkbox, Tooltip, Button } from "antd";
import { useState } from "react";
import { httpClient } from "../../util/Api";
import Tablas from "./tablas";

const Cuerpo = () => {
  const [ano, setAno] = useState("");
  const [mes, setMes] = useState({});
  const [especialidad, setEspecialidad] = useState({});
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(false);

  const onChangeAno = (date, dateString) => {
    // console.log(date, dateString);
    setAno(dateString);
  };

  const { Option } = Select;

  const mesesData = [
    <Option key="en">Enero</Option>,
    <Option key="fe">Febrero</Option>,
    <Option key="ma">Marzo</Option>,
    <Option key="ab">Abril</Option>,
    <Option key="my">Mayo</Option>,
    <Option key="jn">Junio</Option>,
    <Option key="jl">Julio</Option>,
    <Option key="ag">Agosto</Option>,
    <Option key="se">Setiembre</Option>,
    <Option key="oc">Octubre</Option>,
    <Option key="no">Noviembre</Option>,
    <Option key="di">Diciembre</Option>,
  ];

  const especialidadData = [
    <Option key="001">CARDIOLOGIA</Option>,
    <Option key="002">DERMATOLOGIA</Option>,
    <Option key="003">GASTROENTEROLOGIA</Option>,
    <Option key="004">GINECOLOGIA</Option>,
  ];

  function handleChangeMeses(value) {
    console.log(value);

    let resp = null;
    switch (value) {
      case "en":
        resp = { orden: 1, key: "en", value: "ENERO" };
        break;
      case "fe":
        resp = { orden: 2, key: "fe", value: "FEBRERO" };
        break;
      case "ma":
        resp = { orden: 3, key: "ma", value: "MARZO" };
        break;
      case "ab":
        resp = { orden: 4, key: "ab", value: "ABRIL" };
        break;
      case "my":
        resp = { orden: 5, key: "my", value: "MAYO" };
        break;
      case "jn":
        resp = { orden: 6, key: "jn", value: "JUNIO" };
        break;
      case "jl":
        resp = { orden: 7, key: "jl", value: "JULIO" };
        break;
      case "ag":
        resp = { orden: 8, key: "ag", value: "AGOSTO" };
        break;
      case "se":
        resp = { orden: 9, key: "se", value: "SETIEMBRE" };
        break;
      case "oc":
        resp = { orden: 10, key: "oc", value: "OCTUBRE" };
        break;
      case "no":
        resp = { orden: 11, key: "no", value: "NOVIEMBRE" };
        break;
      case "di":
        resp = { orden: 12, key: "di", value: "DICIEMBRE" };
        break;
      default:
        break;
    }

    setMes(resp);
  }

  function handleChangeEspecialidad(value) {
    // {{ key: "0001", titulo: "Laboratorio" }}

    let resp = null;

    switch (value) {
      case "001":
        resp = { key: "001", titulo: "CARDIOLOGIA" };
        break;
      case "002":
        resp = { key: "002", titulo: "DERMATOLOGIA" };
        break;
      case "003":
        resp = { key: "003", titulo: "GASTROENTEROLOGIA" };
        break;
      case "004":
        resp = { key: "004", titulo: "GINECOLOGIA" };
        break;
      default:
        break;
    }
    console.log(resp);
    setEspecialidad(resp);
  }

  async function traerData() {
    if (ano !== "") {
      setCargando(true);
      const response = await httpClient.post("/reportes/getReporte3", {
        AÑO: ano,
        MES: mes.orden.toString().padStart(2, "0"),
        ESPECIALIDAD: especialidad.key,
      });
      setData(response.data.data);
      console.log(response.data.data);
      setCargando(false);
    }
  }

  return (
    <div>
      <Col xs={24}>
        <Row justify="center" align="middle">
          <Col xs={4}>
            <Tooltip title="Seleccione el año">
              <DatePicker
                onChange={onChangeAno}
                picker="year"
                placeholder="Año"
              />
            </Tooltip>
          </Col>
          <Col xs={5}>
            <Tooltip title="Seleccione el mes">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Seleccione el mes"
                onChange={handleChangeMeses}
              >
                {mesesData}
              </Select>
            </Tooltip>
          </Col>
          <Col xs={9}>
            <Tooltip title="Seleccione la especialidad">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Seleccione la especialidad"
                onChange={handleChangeEspecialidad}
              >
                {especialidadData}
              </Select>
            </Tooltip>
          </Col>

          <Col xs={2}>
            <Tooltip title="buscar">
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                size="large"
                onClick={() => traerData()}
                loading={cargando}
              />
            </Tooltip>
          </Col>
        </Row>

        {data ? (
          <Tablas
            ano={ano}
            mes={mes}
            especialidad={especialidad}
            data={data}
          ></Tablas>
        ) : null}
      </Col>
    </div>
  );
};

export default Cuerpo;
