import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
  Form
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListCliente() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [openEnderecoModal, setOpenEnderecoModal] = useState(false);
  const [openCadastroEnderecoModal, setOpenCadastroEnderecoModal] = useState(false);
  const [listaEnderecos, setListaEnderecos] = useState([]);
  const [endereco, setEndereco] = useState({
    bairro: '',
    cep: '',
    rua: '',
    numero: '',
    estado: '',
    idCliente: ''
  });

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/cliente").then((response) => {
      setLista(response.data);
    });
  }

  function formatarData(dataParam) {
    if (!dataParam) return "";
    let arrayData = dataParam.split("-");
    return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
  }

  async function remover() {
    try {
      await axios.delete(`http://localhost:8080/api/cliente/${idRemover}`);
      console.log("Cliente removido com sucesso.");
      carregarLista();
    } catch (error) {
      console.error("Erro ao remover um cliente.");
    } finally {
      setOpenModal(false);
    }
  }

  function abrirModalEnderecos(cliente) {
    setClienteSelecionado(cliente);
    setOpenEnderecoModal(true);
    BuscaListaEndereco(cliente.id);
  }

  function abrirModalCadastroEndereco(cliente) {
    setClienteSelecionado(cliente);
    setOpenCadastroEnderecoModal(!openCadastroEnderecoModal);
  }

  useEffect(() => {
    if (endereco.cep) {
      obterDadosCep(endereco.cep);
    }
  }, [endereco.cep]);

  function obterDadosCep(cep) {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const data = response.data;
        setEndereco(prev => ({
          ...prev,
          estado: data.uf,
          rua: data.logradouro,
          bairro: data.bairro
        }));
      })
      .catch(error => {
        console.error("Erro ao buscar CEP:", error);
      });
  }

  function BuscaListaEndereco(id) {
    axios.get(`http://localhost:8080/api/endereco/cliente/${id}`)
    .then((response) => {
      setListaEnderecos(response.data)
    })
    .catch(error => {
      console.error("Erro ao buscar a lista de endereços cadastrados", error);
    });
  }

  function salvaEdereco() {
    endereco.idCliente = clienteSelecionado?.id;

    axios.post("http://localhost:8080/api/endereco", endereco)
    .then(() => {
      BuscaListaEndereco(clienteSelecionado?.id)
      abrirModalCadastroEndereco(clienteSelecionado)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      <MenuSistema tela="cliente" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cliente </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cliente"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cliente) => (
                  <Table.Row key={cliente.id}>
                    <Table.Cell>{cliente.nome}</Table.Cell>
                    <Table.Cell>{cliente.cpf}</Table.Cell>
                    <Table.Cell>
                      {formatarData(cliente.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{cliente.foneCelular}</Table.Cell>
                    <Table.Cell>{cliente.foneFixo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Editar"
                        icon
                        as={Link}
                        to="/form-cliente"
                        state={{ id: cliente.id }}
                      >
                        <Icon name="edit" />
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Remover"
                        icon
                        onClick={() => confirmaRemover(cliente.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="blue"
                        title="Ver endereços"
                        icon
                        onClick={() => abrirModalEnderecos(cliente)}
                      >
                        <Icon name="map marker alternate" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>

      {/* Modal de confirmação de remoção */}
      <Modal basic open={openModal} onClose={() => setOpenModal(false)}>
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            Tem certeza que deseja remover esse registro?
          </div>
        </Header>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpenModal(false)}>
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={remover}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Modal de endereços */}
      <Modal
        open={openEnderecoModal}
        onClose={() => setOpenEnderecoModal(false)}
        size="small"
      >
        <Modal.Header>Endereços do cliente: {clienteSelecionado?.nome}</Modal.Header>
        <Modal.Content>
          <p>Você pode adicionar ou consultar os endereços vinculados a este cliente.</p>
          <Table color="blue" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>CEP</Table.HeaderCell>
                  <Table.HeaderCell>Estado</Table.HeaderCell>
                  <Table.HeaderCell>Bairro</Table.HeaderCell>
                  <Table.HeaderCell>Rua</Table.HeaderCell>
                  <Table.HeaderCell>Número</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listaEnderecos.map((end) => (
                  <Table.Row key={end.id}>
                      <Table.Cell>{end.cep}</Table.Cell>
                      <Table.Cell>{end.estado}</Table.Cell>
                      <Table.Cell>{end.bairro}</Table.Cell>
                      <Table.Cell>{end.rua}</Table.Cell>
                      <Table.Cell>{end.numero}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => abrirModalCadastroEndereco(clienteSelecionado)}
            color="blue"
          >
            <Icon name="plus" /> Cadastrar novo endereço
          </Button>
          <Button onClick={() => setOpenEnderecoModal(false)}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Modal de cadastro de endereco */}
      <Modal
        open={openCadastroEnderecoModal}
        onClose={() => setOpenCadastroEnderecoModal(false)}
        size="small"
      >
        <Modal.Header>Novo Endereço</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                required
                fluid
                label='CEP'
                width={2}
                maxLength="15"
                value={endereco.cep}
                onChange={e => {
                  setEndereco({ ...endereco, cep: e.target.value });
                }}
              />
              <Form.Input
                required
                fluid
                width={5}
                label='Estado'
                maxLength="2"
                value={endereco.estado}
                onChange={e =>
                  setEndereco({ ...endereco, estado: e.target.value })
                }
              />
            <Form.Input
              required
              fluid
              width={5}
              label='Bairro'
              value={endereco.bairro}
              onChange={e =>
                setEndereco({ ...endereco, bairro: e.target.value })
              }
            />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                required
                fluid
                label='Rua'
                value={endereco.rua}
                onChange={e =>
                  setEndereco({ ...endereco, rua: e.target.value })
                }
              />
              <Form.Input
                fluid
                width={5}
                label='Número'
                value={endereco.numero}
                onChange={e =>
                  setEndereco({ ...endereco, numero: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => salvaEdereco()}
            color="blue"
          >
            Cadastrar
          </Button>
          <Button onClick={() => abrirModalCadastroEndereco(clienteSelecionado)}>
            cancelar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

