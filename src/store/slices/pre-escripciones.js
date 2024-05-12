import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  observations: '',
  recipes: '',
  studies: '',
  prescripcionId: null,
};

export const preEscripcionSlice = createSlice({
  name: 'preEscripcion',
  initialState,
  reducers: {
    setPrescription: (state, action) => {
      state.prescripcionId = action.payload;
    },
  },
});

export const { setPrescription } = preEscripcionSlice.actions;

export default preEscripcionSlice.reducer;
