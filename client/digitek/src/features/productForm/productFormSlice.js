import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "",
  price: "",
  total_quantity: "",
  cost: "",
  brand: "",
  description: "",
  image: "",
  imageName: "",
  message: "",
};

const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setImage: (state, action) => {
      state.image = action.payload.image;
      state.imageName = action.payload.name;
    },
    resetForm: (state) => {
      state.name = "";
      state.price = "";
      state.total_quantity = "";
      state.cost = "";
      state.brand = "";
      state.description = "";
      state.image = "";
      state.imageName = "";
      state.message = "";
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
    setAllFields: (state, action) => {
      const product = action.payload;

      state.name = product.name || "";
      state.price = product.price || "";
      state.total_quantity = product.total_quantity || "";
      state.cost = product.cost || "";
      state.brand = product.brand || "";
      state.description = product.description || "";
      state.image = product.image || "";
      state.imageName = "Existing Image";
    },
  },
});

export const {
  setField,
  setImage,
  resetForm,
  setMessage,
  clearMessage,
  setAllFields,
} = productFormSlice.actions;

export default productFormSlice.reducer;