import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [open, setOpen] = useState(false);
    const [entregadorSelecionado, setEntregadorSelecionado] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

        useEffect(() => {
          carregarLista();
    }, [])

    function carregarLista() {
        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }
    
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    async function remover() {
    
        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
        .then((response) => {
    
            console.log('Entrega removida com sucesso.')
    
            axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
        })
        .catch((error) => {
            console.log('Erro ao remover um entrega.')
        })
        setOpenModal(false)
    }

    function abrirModal(entregador) {
        setEntregadorSelecionado(entregador);
        setOpen(true);
    }

    function fecharModal() {
        setEntregadorSelecionado(null);
        setOpen(false);
    }

    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>RG</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map(entregador => (
                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{entregador.rg}</Table.Cell>
                                        <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados desta entrega'
                                                icon
                                            >
                                                <Link to="/form-entregador" state={{id: entregador.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link> 
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover esta entrega'
                                                icon>
                                                   <Icon 
                                                   onClick={e => confirmaRemover(entregador.id)}
                                                   name='trash' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Sobre o entregador'
                                                icon
                                                onClick={() => abrirModal(entregador)}
                                            >
                                                <Icon name='info' />
                                            
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            
            <Modal
                           basic
                           onClose={() => setOpenModal(false)}
                           onOpen={() => setOpenModal(true)}
                           open={openModal}
                     >
                           <Header icon>
                               <Icon name='trash' />
                               <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
                           </Header>
                           <Modal.Actions>
                               <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                                   <Icon name='remove' /> Não
                               </Button>
                               <Button color='green' inverted onClick={() => remover()}>
                                   <Icon name='checkmark' /> Sim
                               </Button>
                           </Modal.Actions>
                     </Modal>

            <Modal open={open} onClose={fecharModal}>
                <Modal.Header>Entregador: {entregadorSelecionado?.nome}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Detalhes do Entregador</Header>
                        <p><strong>nome:</strong> {entregadorSelecionado?.nome}</p>
                        <p><strong>CPF:</strong> {entregadorSelecionado?.cpf}</p>
                        <p><strong>RG:</strong> {entregadorSelecionado?.rg}</p>
                        <p><strong>Data de Nascimento:</strong> {formatarData(entregadorSelecionado?.dataNascimento)}</p>
                        <p><strong>Fone Celular:</strong> {entregadorSelecionado?.foneCelular}</p>
                        <p><strong>Fone Fixo:</strong> {entregadorSelecionado?.foneFixo}</p>
                        <p><strong>qtdEntregasRealizadas:</strong>{entregadorSelecionado?.qtdEntregasRealizadas}</p>
                        <p><strong>valorFrete:</strong>{entregadorSelecionado?.valorFrete}</p>
                        <p><strong>enderecoRua:</strong>{entregadorSelecionado?.enderecoRua}</p>
                        <p><strong>enderecoComplemento:</strong>{entregadorSelecionado?.enderecoComplemento}</p>
                        <p><strong>enderecoNumero:</strong>{entregadorSelecionado?.enderecoNumero}</p>
                        <p><strong>enderecoBairro:</strong>{entregadorSelecionado?.enderecoBairro}</p>
                        <p><strong>enderecoCidade:</strong>{entregadorSelecionado?.enderecoCidade}</p>
                        <p><strong>enderecoCep:</strong>{entregadorSelecionado?.enderecoCep}</p>
                        <p><strong>enderecoUf:</strong>{entregadorSelecionado?.enderecoUf}</p>
                        <p><strong>ativo:</strong>{entregadorSelecionado?.ativo}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={fecharModal} color='orange'>Fechar</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
  }




