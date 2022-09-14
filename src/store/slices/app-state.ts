import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../";

interface AppState {
  showWidgetPopup: boolean;
}

const initialState: AppState = {
  showWidgetPopup: false,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    toggleWidgetPopup: (state, action: PayloadAction<boolean>) => {
      state.showWidgetPopup = action.payload;
    },
  },
});

export const { toggleWidgetPopup } = appStateSlice.actions;

export const selectShowWidgetPopup = (state: RootState) =>
  state.appState.showWidgetPopup;

export default appStateSlice.reducer;
