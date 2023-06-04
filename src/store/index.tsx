import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
}

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

const store = configureStore({
  reducer: {
    produtos: produtosSlice.reducer
  }
})

export default store
