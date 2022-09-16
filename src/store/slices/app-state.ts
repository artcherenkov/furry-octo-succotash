import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../";
import { TWidget } from "../../types";

interface AppState {
  showWidgetPopup: boolean;
  widgets: TWidget[];
  activeWidgetId?: string;
  editingWidget: TWidget | Omit<TWidget, "id"> | undefined;
}

const initialState: AppState = {
  widgets: [],
  editingWidget: undefined,
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
    setEditingWidget: (
      state,
      action: PayloadAction<TWidget | Omit<TWidget, "id"> | undefined>
    ) => {
      state.editingWidget = action.payload;
    },
    editWidget: (state, action: PayloadAction<TWidget>) => {
      const editingWidgetIdx = state.widgets.findIndex(
        (w) => w.id === action.payload.id
      );

      state.widgets[editingWidgetIdx] = action.payload;
    },
    createWidget: (state, action: PayloadAction<TWidget>) => {
      state.widgets = [...state.widgets, action.payload];
    },
  },
});

export const {
  toggleWidgetPopup,
  setActiveWidgetId,
  setWidgets,
  setEditingWidget,
  editWidget,
  createWidget,
} = appStateSlice.actions;

export const selectShowWidgetPopup = (state: RootState) =>
  state.appState.showWidgetPopup;
export const selectActiveWidget = (state: RootState): TWidget | undefined =>
  state.appState.widgets.find((w) => w.id === state.appState.activeWidgetId);
export const selectWidgets = (state: RootState) => state.appState.widgets;
export const selectEditingWidget = (state: RootState) =>
  state.appState.editingWidget;

export default appStateSlice.reducer;
