import { Card } from "antd";

const GeneralVenta = () => {
  return (
    <Card
      title={<div style={{ fontSize: "22px" }}>Tablero General - Venta</div>}
    >
      <iframe
        title="Venta_comparativa_20_21_BS - Page 1"
        width="100%"
        height="804"
        src="https://www.powerbi.com/view?r=eyJrIjoiYjAzNGQ5YWItNjY0NC00ODU4LTk4NGItZmJlYjIwNjkwMzNhIiwidCI6ImViNjNjNGEzLTI5ZGEtNGMzMS05OTI3LThmMjgyMjc3Nzk5OCJ9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </Card>
  );
};

export default GeneralVenta;
