import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.amount;

    },
    deleteProduct: (state, action) => {
      console.log(action.payload.cartIdx);
      state.products.splice(state.products.findIndex(x => x.cartIdx === action.payload.cartIdx), 1);
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.amount;
    },
    increaseProductQuantity: (state, action) => {
      //this funny thing is just so i can precisly target

      state.products[state.products.findIndex(x => x.cartIdx === action.payload.cartIdx)].amount += 1;
      state.total += action.payload.price;
    },
    decreaseProductQuantity: (state, action) => {
      state.products[state.products.findIndex(x => x.cartIdx === action.payload.cartIdx)].amount -= 1;
      state.total -= action.payload.price;
    }

  }
})

export const { addProduct, deleteProduct, increaseProductQuantity, decreaseProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;