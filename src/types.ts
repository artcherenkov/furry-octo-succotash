// POST /api/login
export type TPostUserRequest = { login: string; password: string };
export type TPostUserResponse = { auth_token: string };

// GET /api/widgets
export type TGetWidgetsRequest = void;
export type TGetWidgetsResponse = { widgets: TServerWidget[] };

// POST /api/widgets
export type TPostWidgetsRequest = Omit<TServerWidget, "id" | "widget_link">;
export type TPostWidgetsResponse = { widget_id: string; widget_link: string };

// GET /api/widgets/{id}
export type TGetWidgetRequest = string;
export type TGetWidgetResponse = TServerWidget;

// PUT /api/widgets/{id}
export type TPutWidgetRequest = TServerWidget;
export type TPutWidgetResponse = TServerWidget;

// DELETE /api/widgets/{id}
export type TDeleteWidgetRequest = string;
export type TDeleteWidgetResponse = string;

export type TClientWidget = Omit<TServerWidget, "id" | "widget_link"> & {
  widgetLink: string;
};
export type TServerWidget = {
  id: string;
  name: string;
  widget_link: string;
  fields: TPrizeField[];
};

export type TPrizeField = {
  text: string;
  fullText: string;
  amoText: string;
  url: string;
  color: string;
  textColor: string;
};

export type TWipPrizeField = {
  id: string;
  text: string;
  fullText: string;
  amoText: string;
  url: string;
  color: string;
  textColor: string;
  index: number;
};

export type TWipWidget = {
  id?: string;
  widgetLink?: string;
  name: string;
  fields: TWipPrizeField[];
};
