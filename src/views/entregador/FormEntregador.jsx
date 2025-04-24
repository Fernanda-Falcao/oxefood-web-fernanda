import InputMask from 'comigo-tech-react-input-mask';
import React, { useState } from "react";
import { Button, Container, Divider, Form, Icon, Radio, Select } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormEntregador() {
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [rg, setRG] = useState('');
    const [dtNascimento, setDtNascimento] = useState(true);
    const [fonecelular, setFoneCelular] = useState('');
    const [fonefixo, setFoneFixo] = useState('');
    const [qtdentregasrealizadas, setQtdEntregasRealizadas] = useState('');
    const [valorporFrete, setalorPorFrete] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState(true);
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCEP] = useState('');
    const [uf, setUF] = useState(true);
    const [complemento, setComplemento] = useState(true);
    const [ativo, setAtivo] = useState(true);

    const ufOptions = [
        { key: 'PE', value: 'PE', text: 'Pernambuco' },
        { key: 'SP', value: 'SP', text: 'São Paulo' },
        { key: 'RJ', value: 'RJ', text: 'Rio de Janeiro' },
        { key: 'MG', value: 'MG', text: 'Minas Gerais' },
        { key: 'BA', value: 'BA', text: 'Bahia' },
        //Adicione outros estados conforme necessário
        function salvar() {

            let entregadorRequest = {
                nome: nome,
                cpf: cpf,
                rg: rg,
                dtNascimento: dtNascimento,
                fonecelular: fonecelular,
                fonefixo: fonefixo,
                qtdentregasrealizadas:qtdentregasrealizadas,
                valorporFrete:valorporFrete,
                rua:rua,
                numero:numero,
                bairro:bairro,
                cidade:cidade,
                complemento:complemento,
                ativo:ativo,
                ufOptions:ufOptions
                
            }
    
            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => {
                    console.log('Produto cadastrado com sucesso.')
                })
                .catch((error) => {
                    console.log('Erro ao incluir  um produto.')
                })
        }  
    
    ];

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
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    placeholder="Digite o nome"
                                />

                                <Form.Field required width={6}>
                                    <label>CPF</label>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        className="ui input"
                                    />
                                </Form.Field>

                                <Form.Field required width={6}>
                                    <label>RG</label>
                                    <InputMask
                                        required
                                        mask="99.999.999-9"
                                        className="ui input"
                                    />
                                </Form.Field>
                            </Form.Group>

                            {/* Data Nasc / Celular / Fixo */}
                            <Form.Group widths='equal'>
                                <Form.Field width={6}>
                                    <label>DtNascimento</label>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        className="ui input"
                                    />
                                </Form.Field>

                                <Form.Field width={6}>
                                    <label>Fone Celular</label>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        className="ui input"
                                    />
                                </Form.Field>

                                <Form.Field width={6}>
                                    <label>Fone Fixo</label>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        className="ui input"
                                    />
                                </Form.Field>
                            </Form.Group>

                            {/* QTD Entregas / Valor Frete */}
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    placeholder="Ex: 12"
                                    type="number"
                                    value={qtdEntregasRealizadas}
                                    onChange={(e) => setqtdEntregasRealizadas(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    placeholder="Ex: 15,00"
                                    value={valorPorFrete}
                                    onChange={(e) => setValorPorFrete(e.target.value)}
                                />
                            </Form.Group>

                            {/* Rua / Número */}
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    maxLength="100"
                                />
                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                />
                            </Form.Group>

                            {/* Bairro / Cidade / CEP */}
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                />
                                <Form.Input
                                    fluid
                                    label='CEP'
                                />
                            </Form.Group>

                            {/* UF / Complemento */}
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>UF</label>
                                    <Select
                                        placeholder='Selecione'
                                        options={ufOptions}
                                        value={uf}
                                        onChange={(e, { value }) => setUf(value)}
                                    />
                                </Form.Field>

                                <Form.Input
                                    fluid
                                    label='Complemento'
                                />
                            </Form.Group>

                            {/* Ativo: Sim / Não */}
                            <Form.Group inline>
                                <label>Ativo:</label>
                                <Form.Field>
                                    <Radio
                                        label='Sim'
                                        name='ativo'
                                        value={true}
                                        checked={ativo === true}
                                        onChange={() => setAtivo(true)}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Não'
                                        name='ativo'
                                        value={false}
                                        checked={ativo === false}
                                        onChange={() => setAtivo(false)}
                                    />
                                </Form.Field>
                            </Form.Group>

                            {/* Botões */}
                            <div style={{ marginTop: '4%' }}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>

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
