import axios from "axios";
import { notifyError, notifySuccess } from "../../util/Util";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InputMask from "comigo-tech-react-input-mask";
import {
  Button,
  Container,
  Divider,
  Form,
  Icon,
  Dropdown,
  Radio,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormVenda() {
  const { state } = useLocation();
  const [idVenda, setIdVenda] = useState();
  const [cliente, setCliente] = useState();
  const [produto, setProduto] = useState();
  const [dataVenda, setDataVenda] = useState();
  const [valorTotal, setValorTotal] = useState();
  const [statusVenda, setStatusVenda] = useState();
  const [observacao, setObservacao] = useState();
  const [retiradaEmLoja, setRetiradaEmLoja] = useState();

  const handleChangeRadio = (e, { value }) => {
    setRetiradaEmLoja(value);
  };
  const venda = [
    {
      key: "Pedido Cancelado",
      text: "Pedido Cancelado",
      value: "Pedido Cancelado",
    },
    {
      key: "Aguardando Pagamento",
      text: "Aguardando Pagamento",
      value: "Aguardando Pagamento",
    },
    { key: "Pago", text: "Pago", value: "Pago" },
    { key: "Entregue", text: "Entregue", value: "Entregue" },
  ];

  const handleChange = (e, { value }) => {
    setStatusVenda(value);
  };

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/venda/" + state.id)
        .then((response) => {
          setIdVenda(response.data.id);
          setCliente(response.data.cliente);
          setProduto(response.data.produto);
          setDataVenda(formatarData(response.data.dataVenda));
          setValorTotal(response.data.valorTotal);
          setStatusVenda(response.data.statusVenda);
          setObservacao(response.data.observacao);
          setRetiradaEmLoja(response.data.retiradaEmLoja);
        });
    }
  }, [state]);

  function salvar() {
    let vendaRequest = {
      cliente: cliente,
      produto: produto,
      statusVenda: statusVenda,
      dataVenda: dataVenda,
      valorTotal: valorTotal,
      observacao: observacao,
      retiradaEmLoja: retiradaEmLoja,
    };

    if (idVenda != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/venda/" + idVenda, vendaRequest)
        .then((response) => {
          console.log("Venda alterada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar uma venda.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/venda", vendaRequest)
        .then((response) => {
          console.log("Venda cadastrada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir venda");
        });
    }

    axios
      .post("http://localhost:8080/api/venda", vendaRequest)
      .then((response) => {
        notifySuccess("Venda cadastrado com sucesso.");
      })
      .catch((error) => {
        if (error.response.data.errors != null) {
          for (let i = 0; i < error.response.data.errors.length; i++) {
            notifyError(error.response.data.errors[i].defaultMessage);
          }
        } else {
          notifyError(error.response.data.message);
        }
      });
  }
  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }
  return (
    <div>
      <MenuSistema tela={"venda"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idVenda === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Venda &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idVenda !== undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Venda &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Cliente"
                  maxLength="100"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Produto"
                  maxLength="100"
                  value={produto}
                  onChange={(e) => setProduto(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input fluid label="Status da Venda">
                  <Dropdown
                    placeholder="Selecione"
                    fluid
                    selection
                    options={venda}
                    value={statusVenda}
                    onChange={handleChange}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label="Data da venda" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataVenda}
                    onChange={(e) => setDataVenda(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="Valor Total"
                  value={valorTotal}
                  onChange={(e) => setValorTotal(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Observação"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field>
                  <label>Retirada em loja:</label>
                  <Radio
                    label="Sim"
                    name="radioGroup"
                    value={true}
                    checked={retiradaEmLoja === true}
                    onChange={handleChangeRadio}
                  />
                  &nbsp;&nbsp;
                  <Radio
                    label="Não"
                    name="radioGroup"
                    value={false}
                    checked={retiradaEmLoja === false}
                    onChange={handleChangeRadio}
                  />
                </Form.Field>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-venda"}>
                <Button
                  //type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Voltar
                </Button>
              </Link>
              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                disabled={
                  !cliente ||
                  !produto ||
                  !dataVenda ||
                  !statusVenda ||
                  !valorTotal ||
                  !observacao
                }
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
