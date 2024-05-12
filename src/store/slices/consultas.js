import { createSlice } from '@reduxjs/toolkit';

const initialState = { activeConsulta: null };

export const ConsultasSlice = createSlice({
  name: 'Consultas',
  initialState,
  reducers: {
    setActiveConsulta: (state) => {
      state.value += 1;
    },
  },
});

export const { increment, decrement, incrementByAmount } = ConsultasSlice.actions;

export default ConsultasSlice.reducer;
