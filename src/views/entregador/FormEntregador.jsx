import React, { useState } from "react";
import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon, Radio, Select } from 'semantic-ui-react';

export default function FormEntregador() {
    const [qtdEntregasRealizadas, setqtdEntregasRealizadas] = useState('');
    const [valorPorFrete, setValorPorFrete] = useState('');
    const [uf, setUf] = useState('');
    const [ativo, setAtivo] = useState(true);

    const ufOptions = [
       { key: 'PE', value: 'PE', text: 'Pernambuco' },
       { key: 'SP', value: 'SP', text: 'São Paulo' },
       { key: 'RJ', value: 'RJ', text: 'Rio de Janeiro' },
       { key: 'MG', value: 'MG', text: 'Minas Gerais' },
       { key: 'BA', value: 'BA', text: 'Bahia' },
        //Adicione outros estados conforme necessário
    ];

    return (
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
                                <label>DT Nascimento</label>
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
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>

                    </Form>
                </div>
            </Container>
        </div>
    );
}
