import axios from "axios";
//import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormCategoriaProduto() {

  const { state } = useLocation();
  const [descricao, setDescricao] = useState();
  const [idCategoria, setIdCategoria] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/categoriaproduto/" + state.id)
        .then((response) => {
          setIdCategoria(response.data.id);
          setDescricao(response.data.descricao);
        });
    }
  }, [state]);

  function salvar() {
    let categoriaProdutoRequest = {
      descricao: descricao,
    }

      if (idCategoria != null) { //Alteração:
            axios.put("http://localhost:8080/api/categoriaproduto/" + idCategoria,categoriaProdutoRequest)
                .then((response) => { console.log('Categoria de Produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter Categoria de Produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/categoriaproduto", categoriaProdutoRequest)
                .then((response) => { console.log('Categoria de Produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir Categoria de Produtoe.') })
        }


        axios.post("http://localhost:8080/api/categoriaproduto", categoriaProdutoRequest)
            .then((response) => {
                console.log('Categoria de produto cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir c ategoria de produto.')
            })
    
  }
  return (
    <div>
      <MenuSistema tela={"categoriaProduto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCategoria === undefined && (
            <h2>
              
              <span style={{ color: "darkgray" }}>
                {" "}
                Categoria &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>
              Cadastro
            </h2>
          )}
          {idCategoria !== undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Categoria &nbsp;
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
                  required
                  fluid
                  label="Descrição"
                  maxLength="100"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" />
                <Link to={"/list-categoriaproduto"}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                disabled={!descricao}
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