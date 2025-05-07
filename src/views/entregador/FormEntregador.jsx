import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link } from "react-router-dom";
import InputMask from "comigo-tech-react-input-mask/lib/react-input-mask.development";

const ufList = [
    {
        key: 'o',
        text: 'Alagoas',
        value: 'Al',
    },

    {
        key: 'f',
        text: 'Paraíba',
        value: 'PB'
    },

    {
        key: 'm',
        text: 'Pernambuco',
        value: 'PE'
    },

]

export default function FormEntregador() {
    const [nome, setNome] = useState();
    const [cpf, setCPF] = useState();
    const [rg, setRG] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdentregasrealizadas, setQtdEntregasRealizadas] = useState();
    const [valorporFrete, setValorPorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCep, setEnderecoCEP] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoEstado, setEnderecoEstado] = useState(true);
    const [enderecoComplemento, setEnderecoComplemento] = useState(true);
    const [ativo, setAtivo] = useState(true);

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: parseInt(qtdentregasrealizadas),
            valorporFrete: parseFloat(valorporFrete),
            enderecoRua: enderecoRua,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCep: enderecoCep,
            enderecoCidade: enderecoCidade,
            enderecoEstado: enderecoEstado,
            enderecoComplemento: enderecoComplemento,
            ativo: ativo,


        }

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir  um entregador.')
            })
    }



    return (
        <div>

            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified'>
                    <h2>
                        <span style={{ color: 'darkgray' }}>
                            Entregador &nbsp;
                            <Icon name='angle double right' size="small" />
                        </span>
                        Cadastro
                    </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>

                            {/* Nome / CPF / RG */}
                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask    
                                       required
                                       mask="9999.999.999"
                                       value={cpf}
                                       onChange={e => setCPF(e.target.value)}
                                />
                               </Form.Input>
                               
                                <Form.Input
                                    required
                                    fluid
                                    label='RG'>
                                   <InputMask
                                    required
                                    mask="9999.999-99"
                                    value={rg}
                                    onChange={e => setRG(e.target.value)}
                                />
                               </Form.Input>
                            </Form.Group>


                            {/* Data Nasc / Celular / Fixo */}
                            <Form.Group >
                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}>
                                    <InputMask
                                      mask="99/99/9999"
                                      maskChar={null}
                                      placeholder="Ex:20/03/1981"
                                    value={dataNascimento}
                                    onChange={e => setDataNascimento(e.target.value)}
                                />

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={3}
                                    value={foneCelular}
                                    onChange={(e) => setFoneCelular(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Input
                                fluid
                                label='Fone Fixo'
                                width={6}>
                                <InputMask
                                  mask="(99) 9999.9999"
                                  value={foneFixo}
                                  onChange={(e) => setFoneFixo(e.target.value)}
                              />
                            </Form.Input>

                            {/* QTD Entregas / Valor Frete */}
                            <Form.Group >
                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={3}
                                    value={qtdentregasrealizadas}
                                    onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={3}
                                    value={valorporFrete}
                                    onChange={(e) => setValorPorFrete(e.target.value)}

                                />
                            </Form.Group>

                            {/* Rua / Número */}
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={7}
                                    value={enderecoRua}
                                    onChange={(e) => setEnderecoRua(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    value={enderecoNumero}
                                    onChange={(e) => setEnderecoNumero(e.target.value)}
                                />
                            </Form.Group>

                            {/* Bairro / Cidade / CEP */}
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={5}
                                    value={enderecoBairro}
                                    onChange={(e) => setEnderecoBairro(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={3}
                                    value={enderecoCidade}
                                    onChange={(e) => setEnderecoCidade(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={6}
                                    value={enderecoCep}
                                    onChange={(e) => setEnderecoCEP(e.target.value)}
                                />
                            </Form.Group>

                            {/* UF / Complemento */}

                            <Form.Select
                                fluid
                                label='UF'
                                options={ufList}
                                placeholder='Selecione'
                                value={enderecoEstado}
                                onChange={(e, { value }) => { setEnderecoEstado(value) }}
                            />


                            <Form.Input
                                fluid
                                label='Complemento'
                                value={enderecoComplemento}
                                onChange={(e) => setEnderecoComplemento(e.target.value)}
                            />


                            {/* Ativo: Sim / Não */}
                            <Form.Group inline>
                                <label>Ativo:</label>
                                <Form.Radio
                                    label='Sim'
                                    checked={ativo === true}
                                    onChange={() => setAtivo(true)}
                                />
                                <Form.Radio
                                    label='Não'
                                    checked={ativo === false}
                                    onChange={() => setAtivo(false)}
                                />

                            </Form.Group>

                            {/* Botões */}
                            <div style={{ marginTop: '4%' }}>
                                <Link to={'/list-entregador'}>
                                    <Button
                                        inverted
                                        circular
                                        icon
                                        labelPosition='left'
                                        color='orange'
                                    >
                                        <Icon name='reply' /> Voltar
                                    </Button>
                                </Link>

                                <Button
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='blue'
                                    floated='right'
                                    onClick={() => salvar()}
                                >
                                    <Icon name='save' />
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
