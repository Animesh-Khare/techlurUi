import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allEmployee: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    storeAllEmployee: (state, action) => {
      state.allEmployee = action.payload;
    },
  },
});

export const { storeAllEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
