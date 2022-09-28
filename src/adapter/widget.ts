import { TServerWidget, TWipWidget } from "../types";
import { nanoid } from "nanoid";

export const widgetToClient = (widget: TServerWidget): TWipWidget => {
  const fields = widget.fields.map((f, idx) => ({
    ...f,
    index: idx,
    id: nanoid(),
  }));

  const result: TWipWidget & { widget_link?: string } = {
    ...widget,
    widgetLink: widget.widget_link,
    fields,
  };

  delete result.widget_link;

  return result;
};
export const widgetToServer = (
  widget: TWipWidget
): TServerWidget | Omit<TServerWidget, "id" | "widget_link"> => {
  const fields = widget.fields.map((f) => ({
    text: f.text,
    fullText: f.fullText,
    amoText: f.amoText,
    url: f.url,
    color: f.color,
    textColor: f.textColor,
  }));

  const result = { ...widget, widget_link: widget.widgetLink, fields };

  delete result.widgetLink;

  return result;
};
