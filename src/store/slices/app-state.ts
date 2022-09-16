import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../";
import { TWidget } from "../../types";

interface AppState {
  showWidgetPopup: boolean;
  widgets: TWidget[];
  activeWidgetId?: string;
}

const initialState: AppState = {
  widgets: [],
  showWidgetPopup: false,
  activeWidgetId: undefined,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setActiveWidgetId: (state, action: PayloadAction<string | undefined>) => {
      state.activeWidgetId = action.payload;
    },
    toggleWidgetPopup: (state, action: PayloadAction<boolean>) => {
      state.showWidgetPopup = action.payload;
    },
    setWidgets: (state, action: PayloadAction<TWidget[]>) => {
      state.widgets = action.payload;
    },
  },
});

export const { toggleWidgetPopup, setActiveWidgetId, setWidgets } =
  appStateSlice.actions;

export const selectShowWidgetPopup = (state: RootState) =>
  state.appState.showWidgetPopup;
export const selectActiveWidget = (state: RootState): TWidget | undefined =>
  state.appState.widgets.find((w) => w.id === state.appState.activeWidgetId);
export const selectWidgets = (state: RootState) => state.appState.widgets;

export default appStateSlice.reducer;
