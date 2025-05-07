import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [open, setOpen] = useState(false);
    const [entregadorSelecionado, setEntregadorSelecionado] = useState(null);

    useEffect(() => {
        carregarLista();
    }, []);

    function carregarLista() {
        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data);
            });
    }

    function formatarData(dataParam) {
        if (!dataParam) return '';
        let arrayData = dataParam.split('-');
        return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
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
                                    <Table.HeaderCell>nome</Table.HeaderCell>
                                    <Table.HeaderCell>cpf</Table.HeaderCell>
                                    <Table.HeaderCell>rg</Table.HeaderCell>
                                    <Table.HeaderCell>dtNascimento</Table.HeaderCell>
                                    <Table.HeaderCell>foneCelular</Table.HeaderCell>
                                    <Table.HeaderCell>fonefixo</Table.HeaderCell>
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
                                        <Table.Cell>{entregador.fonefixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados desta entrega'
                                                icon
                                            >
                                                <Icon name='edit' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover esta entrega'
                                                icon
                                                
                                            >
                                                <Icon name='trash' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color= 'blue'
                                                title = 'Sobre o entregador'
                                                icon
                                                onClick={() => abrirModal(entregador)}
                                            >
                                                <Icon name= 'info'/>
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal open={open} onClose={fecharModal}>
                <Modal.Header>Entregador: {entregadorSelecionado?.nome}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Detalhes do Entregador</Header>
                        <p><strong>CPF:</strong> {entregadorSelecionado?.cpf}</p>
                        <p><strong>RG:</strong> {entregadorSelecionado?.rg}</p>
                        <p><strong>Data de Nascimento:</strong> {formatarData(entregadorSelecionado?.dataNascimento)}</p>
                        <p><strong>Fone Celular:</strong> {entregadorSelecionado?.foneCelular}</p>
                        <p><strong>Fone Fixo:</strong> {entregadorSelecionado?.fonefixo}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={fecharModal} color='orange'>Fechar</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}




