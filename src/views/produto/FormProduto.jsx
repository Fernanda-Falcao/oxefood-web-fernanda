import React, { useState } from "react";
import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';


export default function FormProduto() {
    const [valorUnitario, setValorUnitario] = useState('');
    const [tempoMinimo, setTempoMinimo] = useState('');
    const [tempoMaximo, setTempoMaximo] = useState('');

    return (
        <div>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2>
                        <span style={{ color: 'darkgray' }}>
                            Produto &nbsp;<Icon name='angle double right' size="small" />
                        </span> Cadastro
                    </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Titúlo'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Input
                                required
                                fluid
                                label='Descrição'
                                maxLength="1000"
                            />

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Valor Unitário (R$)'
                                    placeholder="Ex: 25.90"
                                    value={valorUnitario}
                                    onChange={(e) => setValorUnitario(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo Entrega Mínimo (min)'
                                    placeholder="Ex: 15"
                                    type="number"
                                    min="0"
                                    value={tempoMinimo}
                                    onChange={(e) => setTempoMinimo(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo Entrega Máximo (min)'
                                    placeholder="Ex: 45"
                                    type="number"
                                    min="0"
                                    value={tempoMaximo}
                                    onChange={(e) => setTempoMaximo(e.target.value)}
                                />
                            </Form.Group>
                        </Form>

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
                    </div>
                </Container>
            </div>
        </div>
    );
}

