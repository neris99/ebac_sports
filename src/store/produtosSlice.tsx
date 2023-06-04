import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './index' // Verifique o nome do arquivo de configuração do Redux, pode ser diferente de 'index'
import { Produto } from '../types'

interface ProdutosState {
  produtos: Produto[]
  carrinho: Produto[]
  favoritos: Produto[]
}

const initialState: ProdutosState = {
  produtos: [],
  carrinho: [],
  favoritos: []
}

const produtosSlice = createSlice({
  name: 'produtos',
  initialState,
  reducers: {
    setProdutos: (state, action: PayloadAction<Produto[]>) => {
      state.produtos = action.payload
    },
    adicionarAoCarrinho: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      if (!state.carrinho.find((p) => p.id === produto.id)) {
        state.carrinho.push(produto)
      }
    },
    favoritar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const index = state.favoritos.findIndex((p) => p.id === produto.id)
      if (index !== -1) {
        state.favoritos.splice(index, 1)
      } else {
        state.favoritos.push(produto)
      }
    }
  }
})

export const { setProdutos, adicionarAoCarrinho, favoritar } =
  produtosSlice.actions

export default produtosSlice.reducer

export const fetchProdutos =
  (): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: Produto[]
      type: 'produtos/setProdutos'
    }) => void
  ) => {
    try {
      const response = await fetch(
        'https://fake-api-tau.vercel.app/api/ebac_sports'
      )
      const data = await response.json()
      dispatch(setProdutos(data))
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  }
