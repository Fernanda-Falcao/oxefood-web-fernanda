import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormCupomDesconto() {

    const { state } = useLocation();
    const [idCupomDesconto, setIdCupomDesconto] = useState();
    const [codigoDesconto, setCodigoDesconto] = useState();
    const [percentualDesconto, setPercentualDesconto] = useState();
    const [valorDesconto, setValorDesconto] = useState();
    const [valorMinimoPedidoPermitido, setValorMinimoPedidoPermitido] = useState();
    const [quantidadeMaximaUso, setQuantidadeMaximaUso] = useState();
    const [inicioVigencia, setInicioVigencia] = useState();
    const [fimVigencia, setfimVigencia] = useState();


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cupomDesconto/" + state.id)
                .then((response) => {
                    setIdcupomDesconto / (response.data.id)
                    setCodigoDesconto(response.data.codigoDesconto)
                    setPercentualDesconto(response.data.percentualDesconto)
                    setValorDesconto(formatarData(response.data.valorDesconto))
                    setValorMinimoPedidoPermitido(response.data.valorMinimoPedidoPermitido)
                    setQuantidadeMaximaUso(response.data.quantidadeMaximaUso)
                    setInicioVigencia(response.data.inicioVigencia)
                    setFimVigencia(response.data.fimVigencia)
                })
        }
    }, [state])

    function salvar() {

        let cupomDescontoRequest = {
            codigoDesconto: codigoDesconto,
            percentualDesconto: percentualDesconto,
            valorDesconto: valorDesconto,
            valorMinimoPedidoPermitido: valorMinimoPedidoPermitido,
            quantidadeMaximaUso: quantidadeMaximaUso,
            inicioVigencia: inicioVigencia,
            fimVigencia: fimVigencia

        }

        if (idCupomDesconto != null) { //Alteração:
            axios.put("http://localhost:8080/api/cupomDesconto/" + idCupomDesconto, cupomDescontoRequest)
                .then((response) => { console.log('Cupom Desconto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um cupom Desconto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/cupomDesconto", cupomDescontoRequest)
                .then((response) => { console.log('Cupom Desconto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o cupom Desconto.') })
        }

        axios.post("http://localhost:8080/api/cupomDesconto", cupomDescontoRequest)
            .then((response) => {
                console.log('Cupom Desconto cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o um cupo mDesconto.')
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    return (

        <div>

            <MenuSistema tela={'cupomDesconto'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idcupomDesconto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> CupomDesconto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCupomDesconto != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> idCupomDesconto != undefined &&
                            &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>

                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='CodigoDesconto'
                                    maxLength="100"
                                    value={codigoDesconto}
                                    onChange={e => setCodigoDesconto(e.target.value)}

                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='PercentualDesconto'>
                                    <InputMask
                                        required
                                        mask="999.999"
                                        value={percentualDesconto}
                                        onChange={e => setPercentualDesconto(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='ValorDesconto'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={valorDesconto}
                                        onChange={e => setValorDesconto(e.target.value)}

                                    />
                                </Form.Input>

                            </Form.Group>
                            <Form.Group >
                                <Form.Input
                                    fluid
                                    label='ValorMinimoPedidoPermitido (R$)'
                                    placeholder="Ex: 25.90"
                                    value={valorMinimoPedidoPermitido}
                                    onChange={(e) => setValorMinimoPedidoPermitido(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='QuantidadeMaximaUso'
                                    placeholder="Ex: 15"
                                    type="number"
                                    min="0"
                                    value={quantidadeMaximaUso}
                                    onChange={(e) => setQuantidadeMaximaUso(e.target.value)}
                                />


                            </Form.Group>


                            <Form.Input
                                fluid
                                label='InicioVigencia'
                                width={6}
                            >
                                <InputMask
                                    mask="99/99/9999"
                                    maskChar={null}
                                    placeholder="Ex: 20/03/1985"
                                    value={inicioVigencia}
                                    onChange={e => setInicioVigencia(e.target.value)}
                                />
                            </Form.Input>

                            <Form.Input
                                fluid
                                label='FimVigencia'
                                width={6}
                            >
                                <InputMask
                                    mask="99/99/9999"
                                    maskChar={null}
                                    placeholder="Ex: 20/03/1985"
                                    value={fimVigencia}
                                    onChange={e => setFimVigencia(e.target.value)}
                                />
                            </Form.Input>




                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-cupomDesconto'}>
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

                    </div>

                </Container>
            </div>
        </div>

    );

}
