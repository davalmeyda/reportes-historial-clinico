import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Row, Col, Select, Checkbox, Tooltip, Button } from "antd";
import { useState } from "react";
import { tablasPrincipales } from "../../constants/TablasPrincipales";
import { httpClient } from "../../util/Api";
import Tablas from "./tablas";

const Cuerpo = ({ impresion }) => {
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

  const mesesData = tablasPrincipales.TablasPrincipales[1].map((item) => (
    <Option key={item.prefijo}>{item.desc_mes}</Option>
  ));

  const tiposData = tablasPrincipales.TablasPrincipales[2].map((item) => (
    <Option key={item.cod_tipo}>{item.desc_tipo}</Option>
  ));

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

  function handleChangeTipos(value) {
    // {{ key: "0001", titulo: "Laboratorio" }}

    const dat = value.map((element) => {
      const seleccionado = tablasPrincipales.TablasPrincipales[2].filter(
        (item) => item.cod_tipo === element
      );

      const resp = {
        key: seleccionado[0].cod_tipo,
        titulo: seleccionado[0].desc_tipo,
      };
      return resp;
    });
    console.log(dat);
    setTipos(dat);
  }

  async function traerData() {
    if (ano !== "") {
      setCargando(true);
      const response = await httpClient.post("/reportes/getReporte1", {
        A??O: ano,
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
            <Tooltip title="Seleccione el a??o">
              <DatePicker
                onChange={onChangeAno}
                picker="year"
                placeholder="A??o"
              />
            </Tooltip>
          </Col>
          <Col xs={7}>
            <Tooltip title="Seleccione los meses">
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
            </Tooltip>
          </Col>
          <Col xs={7}>
            <Tooltip title="Seleccione los tipos">
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
            </Tooltip>
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

        {data && (ordenes || compras) ? (
          <div ref={impresion}>
            <Tablas
              ano={ano}
              meses={meses}
              tipos={tipos}
              ordenes={ordenes}
              compras={compras}
              data={data}
            ></Tablas>
          </div>
        ) : null}
      </Col>
    </div>
  );
};

export default Cuerpo;
