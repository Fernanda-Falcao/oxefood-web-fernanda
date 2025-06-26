import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from './views/util/ProtectedRoute';
import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormCupomDesconto from './views/cupomDesconto/FormCupomDesconto';
import ListCupomDesconto from './views/cupomDesconto/ListCupomDesconto';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import Home from './views/home/Home';
import FormLogin from './views/login/FormLogin';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import FormVenda from './views/venda/FormVenda';
import ListVenda from './views/venda/ListVenda';
import FormCategoriaProduto from './views/categoriaproduto/FormCategoriaProduto';
import ListCategoriaProduto from './views/categoriaproduto/ListCategoriaProduto';


function Rotas() {
    return (
        <>
            <Routes>

                 <Route path="/" element={ <FormLogin/> } />

                <Route
                   path="/home" 
                   element={
                     <ProtectedRoute>
                       <Home />
                   </ProtectedRoute>
                   }
               />

                <Route 
                   path="list-cliente" 
                   element={ <ProtectedRoute>
                           <ListCliente />
                       </ProtectedRoute>
                   }
               />

                <Route 
                  path="list-produto" 
                element={<ProtectedRoute>
                           <ListProduto />
                       </ProtectedRoute>
                   }
                />

                <Route 
                  path="list-entregador" 
                  element={<ProtectedRoute>
                           <ListEntregador />
                       </ProtectedRoute>
                   }
                />
                <Route 
                   path="list-venda" 
                   element={<ProtectedRoute>
                           <ListVenda />
                       </ProtectedRoute>
                   }
                 />
                <Route 
                    path="list-cupomDesconto" 
                    element={<ProtectedRoute>
                           <ListCupomDesconto />
                       </ProtectedRoute>
                   }
                  />
                <Route 
                    path="List-categoriaproduto" e
                    lement ={<ProtectedRoute>
                           <ListCategoriaProduto />
                       </ProtectedRoute>
                   }
                   />

                <Route 
                   path="form-cliente" 
                   element={<ProtectedRoute>
                           <FormCliente />
                       </ProtectedRoute>
                   }
                 />

                <Route 
                  path="form-produto" 
                  element={<ProtectedRoute>
                           <FormProduto/>
                       </ProtectedRoute>
                   }
                 />

                <Route 
                    path="form-entregador" 
                    element={<ProtectedRoute>
                           <FormEntregador/>
                       </ProtectedRoute>
                   }
                 />
                <Route 
                    path="form-venda" 
                    element={<ProtectedRoute>
                           <FormVenda/>
                       </ProtectedRoute>
                   }
                 />
                <Route 
                    path="form-cupomdesconto" 
                    element={<ProtectedRoute>
                           <FormCupomDesconto/>
                       </ProtectedRoute>
                   }
                 />
                <Route 
                  path="form-categoriaproduto" 
                  element={<ProtectedRoute>
                           <FormCategoriaProduto/>
                       </ProtectedRoute>
                   }
                 />

            </Routes>
        </>
    )
}

export default Rotas
