import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import {
  fetchProdutos,
  adicionarAoCarrinho,
  favoritar
} from './store/produtosSlice'
import Header from './components/Header'
import Produtos from './containers/Produtos'

import { GlobalStyle } from './styles'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const dispatch = useDispatch()

  const produtos = useSelector((state: RootState) => state.produtos.produtos)

  const carrinho = useSelector((state: RootState) => state.produtos.carrinho)

  const favoritos = useSelector((state: RootState) => state.produtos.favoritos)

  useEffect(() => {
    dispatch(fetchProdutos())
  }, [dispatch])

  const handleAdicionarAoCarrinho = (produto: Produto) => {
    if (carrinho.find((p: Produto) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(adicionarAoCarrinho(produto))
    }
  }

  const handleFavoritar = (produto: Produto) => {
    dispatch(favoritar(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={handleFavoritar}
          adicionarAoCarrinho={handleAdicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
