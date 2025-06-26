import axios from "axios";
import InputMask from "comigo-tech-react-input-mask/lib/react-input-mask.development";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../util/Util";

const ufList = [
  {
    key: "o",
    text: "Alagoas",
    value: "Al",
  },

  {
    key: "f",
    text: "Paraíba",
    value: "PB",
  },

  {
    key: "m",
    text: "Pernambuco",
    value: "PE",
  },
];

export default function FormEntregador() {
  const { state } = useLocation();
  const [idEntregador, setIdEntregador] = useState();
  const [nome, setNome] = useState("");
  const [cpf, setCpF] = useState("");
  const [rg, setRG] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [foneFixo, setFoneFixo] = useState("");
  const [qtdentregasrealizadas, setQtdEntregasRealizadas] = useState("");
  const [valorFrete, setValorFrete] = useState("");
  const [enderecoRua, setEnderecoRua] = useState("");
  const [enderecoNumero, setEnderecoNumero] = useState("");
  const [enderecoBairro, setEnderecoBairro] = useState("");
  const [enderecoCep, setEnderecoCEP] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoEstado, setEnderecoEstado] = useState(true);
  const [enderecoComplemento, setEnderecoComplemento] = useState(true);
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    //usEffect serve para consultar os dados do cliente
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id);
          setNome(response.data.nome);
          setCpF(response.data.cpf);
          setRG(response.data.rg);
          setDataNascimento(formatarData(response.data.dataNascimento));
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
          setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas);
          setValorFrete(response.data.valorFrete);
          setEnderecoRua(response.data.enderecoRua);
          setEnderecoNumero(response.data.enderecoNumero);
          setEnderecoBairro(response.data.enderecoBairro);
          setEnderecoCEP(response.data.enderecoCep);
          setEnderecoCidade(response.data.enderecoCidade);
          setEnderecoEstado(response.data.enderecoUf);
          setEnderecoComplemento(response.data.enderecoComplemento);
          setAtivo(response.data.ativo);
        });
    }
  }, [state]);

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: parseInt(qtdentregasrealizadas),
      valorFrete: parseFloat(valorFrete),
      enderecoRua: enderecoRua,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCep: enderecoCep,
      enderecoCidade: enderecoCidade,
      enderecoUf: enderecoEstado,
      enderecoComplemento: enderecoComplemento,
      ativo: ativo,
    };

    if (idEntregador != null) {
      //Alteração:
      axios
        .put(
          "http://localhost:8080/api/entregador/" + idEntregador,
          entregadorRequest
        )
        .then((response) => {
          console.log("Entregador alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um entregador.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/entregador", entregadorRequest)
        .then((response) => {
          console.log("Entregador cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o entregador.");
        });
    }

    axios
      .post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => {
        notifySuccess("Entregador cadastrado com sucesso.");
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
      <MenuSistema tela={"entregador"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEntregador === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEntregador !== undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              {/* Nome / CPF / RG */}
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  width={6}
                  value={nome ?? ""}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Input required fluid label="CPF" width={4}>
                  <InputMask
                    required
                    mask="9999.999.9999"
                    value={cpf ?? ""}
                    onChange={(e) => setCpF(e.target.value)}
                  />
                </Form.Input>
                <Form.Input required fluid label="RG" width={6}>
                  <InputMask
                    required
                    mask="9999.999-99"
                    value={rg ?? ""}
                    onChange={(e) => setRG(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
              {/* Data Nasc / Celular / Fixo*/}
              <Form.Group>
                <Form.Input fluid label="Data Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    placeholder="Ex:20/03/1981"
                    value={dataNascimento ?? ""}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneCelular ?? ""}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneFixo ?? ""}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
              {/* QTD Entregas / Valor Frete */}
              <Form.Group>
                <Form.Input
                  fluid
                  label="QTD Entregas Realizadas"
                  width={10}
                  value={qtdentregasrealizadas ?? ""}
                  onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Valor  Frete"
                  width={10}
                  value={valorFrete ?? ""}
                  onChange={(e) => setValorFrete(e.target.value)}
                />
              </Form.Group>

              {/* Rua / Número */}
              <Form.Group>
                <Form.Input
                  fluid
                  label="Rua"
                  width={10}
                  value={enderecoRua ?? ""}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Número"
                  width={10}
                  value={enderecoNumero ?? ""}
                  onChange={(e) => setEnderecoNumero(e.target.value)}
                />
              </Form.Group>

              {/* Bairro / Cidade / CEP */}
              <Form.Group>
                <Form.Input
                  fluid
                  label="Bairro"
                  width={7}
                  value={enderecoBairro ?? ""}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Cidade"
                  width={6}
                  value={enderecoCidade ?? ""}
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="CEP"
                  width={6}
                  value={enderecoCep ?? ""}
                  onChange={(e) => setEnderecoCEP(e.target.value)}
                />
              </Form.Group>
              {/* UF / Complemento */}

              <Form.Select
                fluid
                label="UF"
                options={ufList}
                placeholder="Selecione"
                value={enderecoEstado ?? ""}
                onChange={(e, { value }) => {
                  setEnderecoEstado(value);
                }}
              />

              <Form.Input
                fluid
                label="Complemento"
                value={enderecoComplemento ?? ""}
                onChange={(e) => setEnderecoComplemento(e.target.value)}
              />

              {/* Ativo: Sim / Não */}
              <Form.Group inline>
                <label>Ativo:</label>
                <Form.Radio
                  label="Sim"
                  checked={ativo === true}
                  onChange={() => setAtivo(true)}
                />
                <Form.Radio
                  label="Não"
                  checked={ativo === false}
                  onChange={() => setAtivo(false)}
                />
              </Form.Group>

              {/* Botões */}
              <div style={{ marginTop: "4%" }}>
                <Link to={"/list-entregador"}>
                  <Button
                    inverted
                    circular
                    icon
                    labelPosition="left"
                    color="orange"
                  >
                    <Icon name="reply" /> Voltar
                  </Button>
                </Link>

                <Button
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="blue"
                  floated="right"
                  onClick={() => salvar()}
                >
                  <Icon name="save" />
                  Salvar
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
}
