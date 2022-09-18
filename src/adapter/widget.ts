import { TWidget, TWipWidget } from "../types";
import { nanoid } from "nanoid";

export const widgetToClient = (widget: TWidget): TWipWidget => {
  const fields = widget.fields.map((f, idx) => ({
    ...f,
    index: idx,
    id: nanoid(),
  }));

  return { ...widget, fields };
};
export const widgetToServer = (
  widget: TWipWidget
): TWidget | Omit<TWidget, "id"> => {
  const fields = widget.fields.map((f) => ({
    text: f.text,
    fullText: f.fullText,
    amoText: f.amoText,
    url: f.url,
    color: f.color,
    textColor: f.textColor,
  }));

  return { ...widget, fields };
};
