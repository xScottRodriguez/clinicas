import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeEvent: null,
};

export const agendaCitasSlice = createSlice({
  name: 'agendaCitas',
  initialState,
  reducers: {
    setActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    clearActiveEvent: (state) => {
      state.activeEvent = null;
    },
  },
});

export const { setActiveEvent, clearActiveEvent } = agendaCitasSlice.actions;

export default agendaCitasSlice.reducer;
