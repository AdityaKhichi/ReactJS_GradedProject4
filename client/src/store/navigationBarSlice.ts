import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MainState {
  readonly activeTab: string;
  readonly searchValue: string;
}

const initialState: MainState = {
  activeTab: "movies-in-theaters",
  searchValue: "",
};

export const navBarSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    updateActiveTab: (state, actions: PayloadAction<string>) => {
      state.activeTab = actions.payload;
      state.searchValue = "";
    },
    updateSearchvalue: (state, actions: PayloadAction<string>) => {
      state.searchValue = actions.payload;
    },
  },
});

export default navBarSlice.reducer;
