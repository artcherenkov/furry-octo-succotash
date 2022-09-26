import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import { InputAdornment } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { TWipPrizeField } from "../../../types";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectEditingWidget,
  setEditingWidget,
} from "../../../store/slices/app-state";

interface IPrizeRowProps {
  field: TWipPrizeField;
}

const PrizeRow = ({ field }: IPrizeRowProps) => {
  const dispatch = useAppDispatch();
  const editingWidget = useAppSelector(selectEditingWidget);

  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState(field);
  const formRef = useRef<null | HTMLFormElement>();

  const onAccordionChange = () => {
    if (isEditing) {
      return;
    }

    setExpanded(!expanded);
  };

  const onEditClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    setIsEditing(true);
    setExpanded(true);
  };
  const onSaveClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    formRef.current?.requestSubmit();
  };
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === "index") return;
    let value = evt.target.value;
    if (["color", "textColor"].includes(evt.target.name)) {
      value = "#" + value;
    }
    setData({ ...data, [evt.target.name]: value });
  };
  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!editingWidget) return;

    const newFields = editingWidget.fields.slice();
    const fieldToEditIdx = newFields.findIndex((f) => f.id === data.id);

    if (fieldToEditIdx === -1) return;

    newFields[fieldToEditIdx] = data;

    dispatch(setEditingWidget({ ...editingWidget, fields: newFields }));
    setIsEditing(false);
    setExpanded(false);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={onAccordionChange}
      sx={{
        "&:not(:last-child)": { mb: 2 },
      }}
    >
      <AccordionSummary>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>{data.text}</Typography>
          <Box>
            {isEditing ? (
              <IconButton sx={{ mr: 1 }} size="small" onClick={onSaveClick}>
                <DoneIcon />
              </IconButton>
            ) : (
              <IconButton sx={{ mr: 1 }} size="small" onClick={onEditClick}>
                <EditIcon />
              </IconButton>
            )}

            <IconButton size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="form"
            ref={formRef}
            sx={{ flexGrow: 1 }}
            onChange={onChange}
            onSubmit={onSubmit}
          >
            <Box sx={{ display: "flex" }}>
              <TextField
                name="index"
                disabled={!isEditing}
                sx={{ mr: 3, minWidth: 80, maxWidth: 80 }}
                size="small"
                defaultValue="1"
                label="№ сектора"
                variant="standard"
              />
              <TextField
                name="text"
                disabled={!isEditing}
                sx={{ mr: 3 }}
                size="small"
                fullWidth
                defaultValue={data.text}
                label="Название приза"
                variant="standard"
              />
              <TextField
                name="amoText"
                disabled={!isEditing}
                size="small"
                fullWidth
                defaultValue={data.amoText}
                label="Название для AMO"
                variant="standard"
              />
            </Box>
            <Box mt={3} sx={{ display: "flex" }}>
              <TextField
                name="fullText"
                disabled={!isEditing}
                fullWidth
                size="small"
                defaultValue={data.fullText}
                label="Полное название приза"
                variant="standard"
              />
            </Box>
            <Box mt={3} sx={{ display: "flex" }}>
              <TextField
                name="textColor"
                disabled={!isEditing}
                fullWidth
                size="small"
                label="Цвет текста"
                defaultValue={data.textColor.toLowerCase().slice(1)}
                variant="standard"
                sx={{ mr: 3 }}
                InputProps={{
                  style: { fontFamily: "Roboto Mono" },
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        sx={{
                          mr: 1,
                          width: 13,
                          height: 13,
                          borderRadius: "2px",
                          background: data.textColor.toLowerCase(),
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="color"
                disabled={!isEditing}
                fullWidth
                size="small"
                label="Цвет сектора"
                defaultValue={data.color.toLowerCase().slice(1)}
                variant="standard"
                InputProps={{
                  style: { fontFamily: "Roboto Mono" },
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        sx={{
                          mr: 1,
                          width: 13,
                          height: 13,
                          borderRadius: "2px",
                          background: data.color.toLowerCase(),
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mt={3} sx={{ display: "flex" }}>
              <TextField
                name="url"
                disabled={!isEditing}
                fullWidth
                size="small"
                defaultValue={data.url}
                label="Ссылка на запись"
                variant="standard"
              />
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PrizeRow;
