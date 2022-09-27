import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../";
import { TWipWidget } from "../../types";
import { widgetToClient } from "../../adapter/widget";
import { getToken, setToken } from "../../utils/local-storage";
import { api } from "../services/api";

interface AppState {
  showWidgetPopup: boolean;
  widgets: TWipWidget[];
  activeWidgetId?: string;
  editingWidget: TWipWidget | Omit<TWipWidget, "id"> | undefined;
  token: string | undefined;
}

const initialState: AppState = {
  widgets: [],
  editingWidget: undefined,
  showWidgetPopup: false,
  activeWidgetId: undefined,
  token: undefined,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState: () => {
    const token = getToken() ?? undefined;
    return { ...initialState, token };
  },
  reducers: {
    setActiveWidgetId: (state, action: PayloadAction<string | undefined>) => {
      state.activeWidgetId = action.payload;
    },
    toggleWidgetPopup: (state, action: PayloadAction<boolean>) => {
      state.showWidgetPopup = action.payload;
    },
    setWidgets: (state, action: PayloadAction<TWipWidget[]>) => {
      state.widgets = action.payload;
    },
    setEditingWidget: (
      state,
      action: PayloadAction<TWipWidget | Omit<TWipWidget, "id"> | undefined>
    ) => {
      state.editingWidget = action.payload;
    },
    editWidget: (state, action: PayloadAction<TWipWidget>) => {
      const editingWidgetIdx = state.widgets.findIndex(
        (w) => w.id === action.payload.id
      );

      state.widgets[editingWidgetIdx] = action.payload;
    },
    createWidget: (state, action: PayloadAction<TWipWidget>) => {
      state.widgets = [...state.widgets, action.payload];
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = [...state.widgets].filter((w) => w.id !== action.payload);
    },
    setAuthToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getWidgets.matchFulfilled,
      (state, { payload }) => {
        state.widgets = payload.widgets.map(widgetToClient);
      }
    );
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        setToken(payload.auth_token);
        state.token = payload.auth_token;
      }
    );
  },
});

export const {
  toggleWidgetPopup,
  setActiveWidgetId,
  setEditingWidget,
  editWidget,
  createWidget,
  setAuthToken,
  removeWidget,
} = appStateSlice.actions;

export const selectShowWidgetPopup = (state: RootState) => {
  return state.appState.showWidgetPopup;
};
export const selectActiveWidget = (
  state: RootState
): TWipWidget | undefined => {
  return state.appState.widgets.find(
    (w) => w.id === state.appState.activeWidgetId
  );
};
export const selectWidgets = (state: RootState) => {
  return state.appState.widgets;
};
export const selectEditingWidget = (state: RootState) => {
  return state.appState.editingWidget;
};
export const selectIsAuth = (state: RootState) => {
  return !!state.appState.token;
};

export default appStateSlice.reducer;
