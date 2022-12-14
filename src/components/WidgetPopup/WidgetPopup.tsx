import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createWidget,
  editWidget,
  selectEditingWidget,
  selectShowWidgetPopup,
  setActiveWidgetId,
  setEditingWidget,
  toggleWidgetPopup,
} from "../../store/slices/app-state";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrizeRow from "./components/PrizeRow";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { TServerWidget, TWipWidget } from "../../types";
import WidgetName from "../WidgetForm/components/WidgetName";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { nanoid } from "nanoid";
import {
  useLazyPostWidgetsQuery,
  useLazyPutWidgetByIdQuery,
} from "../../store/services/api";
import { widgetToServer } from "../../adapter/widget";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "80vw",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
};

interface IWidgetPopupProps {
  widget: TWipWidget | Omit<TWipWidget, "id"> | undefined;
}

const EMPTY_WIDGET: TWipWidget = {
  name: "Новый виджет",
  fields: [
    {
      id: nanoid(),
      index: 0,
      text: "Приз 1",
      fullText: "",
      amoText: "",
      url: "",
      color: "#1e9cb2",
      textColor: "#e6ffff",
    },
    {
      id: nanoid(),
      index: 1,
      text: "Приз 2",
      fullText: "",
      amoText: "",
      url: "",
      color: "#e6ffff",
      textColor: "#1e96b4",
    },
  ],
};

const createEmptyPrize = (idx: number) => ({
  id: nanoid(),
  index: idx,
  text: `Приз ${idx + 1}`,
  fullText: "",
  amoText: "",
  url: "",
  color: "#1e9cb2",
  textColor: "#e6ffff",
});

const WidgetPopup = ({ widget }: IWidgetPopupProps) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectShowWidgetPopup);
  const editingWidget = useAppSelector(selectEditingWidget);

  const widgetToUse: TWipWidget | Omit<TWipWidget, "id"> =
    widget || EMPTY_WIDGET;

  const [widgetName, setWidgetName] = useState(widgetToUse.name);
  const [canEdit, setCanEdit] = useState(false);
  const [hasWidgetChanged, setHasWidgetChanged] = useState(false);
  const [expandedRow, setExpandedRow] = useState("");
  const [isEditing, setIsEditing] = useState("");

  const [putWidgetById, { isLoading: isPutWidgetLoading }] =
    useLazyPutWidgetByIdQuery();
  const [postWidget, { isLoading: isPostWidgetLoading }] =
    useLazyPostWidgetsQuery();

  useEffect(() => {
    if (open) {
      setWidgetName(widgetToUse.name);
      setCanEdit(false);
      setHasWidgetChanged(false);
      dispatch(setEditingWidget(widgetToUse));
    }
  }, [open, widgetToUse]);

  useEffect(() => {
    setHasWidgetChanged(
      JSON.stringify(editingWidget) !== JSON.stringify(widgetToUse)
    );
  }, [editingWidget, widgetToUse]);

  const handleWidgetNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setWidgetName(evt.target.value);
  };

  const handleClose = () => {
    dispatch(toggleWidgetPopup(false));
    dispatch(setActiveWidgetId(undefined));
    dispatch(setEditingWidget(undefined));
    setWidgetName("");
    setCanEdit(false);
  };

  const onEditWidgetNameClick = () => {
    setCanEdit(true);
  };

  const onNameInputBlur = () => {
    if (!editingWidget) return;

    dispatch(setEditingWidget({ ...editingWidget, name: widgetName }));
  };

  const isNewWidget = !editingWidget?.hasOwnProperty("id");

  const onSaveWidgetClick = () => {
    if (!editingWidget) return;

    if (isNewWidget) {
      postWidget(widgetToServer(editingWidget))
        .unwrap()
        .then((data) => {
          dispatch(
            createWidget({
              ...editingWidget,
              id: data.widget_id,
              widgetLink: data.widget_link,
            })
          );
          handleClose();
        });
    } else {
      putWidgetById(widgetToServer(editingWidget) as TServerWidget).then(() => {
        dispatch(editWidget(editingWidget as TWipWidget));
        handleClose();
      });
    }
  };

  const onAddPrizeButtonClick = () => {
    if (!editingWidget) return;

    dispatch(
      setEditingWidget({
        ...editingWidget,
        fields: [
          ...editingWidget.fields,
          createEmptyPrize(editingWidget.fields.length),
        ],
      })
    );
  };

  const onRowExpand = (id: string) => {
    setExpandedRow(id);
  };

  const onRowSetEditing = (id: string) => {
    setIsEditing(id);
  };

  const saveButtonText = isNewWidget ? "Создать виджет" : "Сохранить виджет";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <WidgetName
          value={widgetName}
          onChange={handleWidgetNameChange}
          onEditClick={onEditWidgetNameClick}
          onBlur={onNameInputBlur}
          disabled={!canEdit}
        />

        <Box mb={2} sx={{ display: "flex" }}>
          <Typography variant="h6">Призы</Typography>
          <IconButton sx={{ ml: "auto" }} onClick={onAddPrizeButtonClick}>
            <AddIcon />
          </IconButton>
        </Box>

        {editingWidget?.fields.map((f) => (
          <PrizeRow
            key={f.id}
            field={f}
            expanded={expandedRow === f.id}
            onExpand={onRowExpand}
            isEditing={isEditing === f.id}
            disableToggling={!!isEditing}
            setIsEditing={onRowSetEditing}
          />
        ))}

        <Button
          disabled={!hasWidgetChanged}
          variant="contained"
          onClick={onSaveWidgetClick}
          sx={{ mt: 3, alignSelf: "flex-end" }}
        >
          {isPutWidgetLoading || isPostWidgetLoading ? "..." : saveButtonText}
        </Button>
      </Box>
    </Modal>
  );
};

export default WidgetPopup;
