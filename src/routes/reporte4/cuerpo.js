import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Row, Col, Select, Checkbox, Tooltip, Button } from "antd";
import { useState } from "react";
import { tablasPrincipales } from "../../constants/TablasPrincipales";
import { httpClient } from "../../util/Api";
import Tablas from "./tablas";

const Cuerpo = ({ setAbrirModal, setDatosModal,impresion }) => {
  const [ano, setAno] = useState("");
  const [meses, setMeses] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(false);

  const onChangeAno = (date, dateString) => {
    // console.log(date, dateString);
    setAno(dateString);
  };

  const { Option } = Select;

  const mesesData = tablasPrincipales.TablasPrincipales[1].map((item) => (
    <Option key={item.prefijo}>{item.desc_mes}</Option>
  ));

  const especialidadData = [
    <Option key="001">CARDIOLOGIA</Option>,
    <Option key="002">DERMATOLOGIA</Option>,
    <Option key="003">GASTROENTEROLOGIA</Option>,
    <Option key="004">GINECOLOGIA</Option>,
  ];

  function handleChangeMeses(value) {
    const dat = value.map((element) => {
            const seleccionado = tablasPrincipales.TablasPrincipales[1].filter(
        (item) => item.prefijo === element
      );

      const resp = {
        orden: seleccionado[0].cod_mes,
        key: seleccionado[0].prefijo,
        value: seleccionado[0].desc_mes,
      };
      return resp;
    });

    setMeses(dat);
  }

  function handleChangeEspecialidad(value) {
    // {{ key: "0001", titulo: "Laboratorio" }}

    const dat = value.map((element) => {
      let resp = null;

      switch (element) {
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
      return resp;
    });
    console.log(dat);
    setEspecialidades(dat);
  }

  async function traerData() {
    if (ano !== "") {
      setCargando(true);
      const response = await httpClient.post("/reportes/getReporte4", {
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
          <Col xs={9}>
            <Tooltip title="Seleccione los meses">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Seleccione los meses"
                onChange={handleChangeMeses}
              >
                {mesesData}
              </Select>
            </Tooltip>
          </Col>
          <Col xs={9}>
            <Tooltip title="Seleccione las especialidades">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Seleccione los especialidades"
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
          <div ref={impresion}>
          <Tablas
            ano={ano}
            meses={meses}
            especialidades={especialidades}
            data={data}
            setDatosModal={setDatosModal}
            setAbrirModal={setAbrirModal}
          ></Tablas>
          </div>
        ) : null}
      </Col>
    </div>
  );
};

export default Cuerpo;
