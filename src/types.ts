// POST /api/login
export type TPostUserRequest = { login: string; password: string };
export type TPostUserResponse = string;

// GET /api/widgets
export type TGetWidgetsRequest = void;
export type TGetWidgetsResponse = { widgets: TWidget[] };

// POST /api/widgets
export type TPostWidgetsRequest = Omit<TWidget, "id">;
export type TPostWidgetsResponse = string;

// GET /api/widgets/{id}
export type TGetWidgetRequest = void;
export type TGetWidgetResponse = TWidget;

// PUT /api/widgets/{id}
export type TPutWidgetRequest = Omit<TWidget, "id">;
export type TPutWidgetResponse = TWidget;

// DELETE /api/widgets/{id}
export type TDeleteWidgetRequest = void;
export type TDeleteWidgetResponse = string;

export type TWidget = {
  id: string;
  name: string;
  fields: TPrizeField[];
};

export type TPrizeField = {
  text: string;
  fullText: string;
  url: string;
  color: string;
  textColor: string;
};
