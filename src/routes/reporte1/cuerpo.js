import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Row, Col, Select, Checkbox, Tooltip, Button } from "antd";
import { useState } from "react";
import { httpClient } from "../../util/Api";
import Tablas from "./tablas";

const Cuerpo = () => {
  const [ano, setAno] = useState("");
  const [meses, setMeses] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [ordenes, setOrdenes] = useState(true);
  const [compras, setCompras] = useState(true);
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

  const tiposData = [
    <Option key="0001">Laboratorio</Option>,
    <Option key="0002">Procedimientos Medicos</Option>,
    <Option key="0003">Ecografia</Option>,
    <Option key="0004">Rayos X</Option>,
  ];

  function handleChangeMeses(value) {
    const dat = value.map((element) => {
      let resp = null;
      switch (element) {
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
      return resp;
    });

    setMeses(dat);
  }

  function handleChangeTipos(value) {
    // {{ key: "0001", titulo: "Laboratorio" }}

    const dat = value.map((element) => {
      let resp = null;

      switch (element) {
        case "0001":
          resp = { key: "0001", titulo: "Laboratorio" };
          break;
        case "0002":
          resp = { key: "0002", titulo: "Procedimientos Medicos" };
          break;
        case "0003":
          resp = { key: "0003", titulo: "Ecografia" };
          break;
        case "0004":
          resp = { key: "0004", titulo: "Rayos X" };
          break;
        default:
          break;
      }
      return resp;
    });
    console.log(dat);
    setTipos(dat);
  }

  async function traerData() {
    if (ano !== "") {
      setCargando(true);
      const response = await httpClient.post("/reportes/getReporte1", {
        AÑO: ano,
      });
      setData(response.data.data);
      console.log(response.data.data);
      setCargando(false);
    }
  }

  return (
    <div>
      <Col xs={24}>
        <Row>
          <Col xs={4}>
            <DatePicker
              onChange={onChangeAno}
              picker="year"
              placeholder="Año"
            />
          </Col>
          <Col xs={7}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Seleccione los meses"
              // defaultValue={["a10", "c12"]}
              onChange={handleChangeMeses}
            >
              {mesesData}
            </Select>
          </Col>
          <Col xs={7}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Seleccione los tipos"
              // defaultValue={["a10", "c12"]}
              onChange={handleChangeTipos}
            >
              {tiposData}
            </Select>
          </Col>
          <Col xs={4}>
            <Checkbox
              defaultChecked={true}
              onChange={(value) => setOrdenes(value.target.checked)}
            >
              Ordenes
            </Checkbox>
            <br />
            <Checkbox
              defaultChecked={true}
              onChange={(value) => setCompras(value.target.checked)}
            >
              Compras
            </Checkbox>
          </Col>

          <Col xs={2}>
            <Tooltip title="search">
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
            meses={meses}
            tipos={tipos}
            ordenes={ordenes}
            compras={compras}
            data={data}
          ></Tablas>
        ) : null}
      </Col>
    </div>
  );
};

export default Cuerpo;