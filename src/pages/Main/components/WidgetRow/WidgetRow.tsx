import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../../store/hooks";
import {
  removeWidget,
  setActiveWidgetId,
  toggleWidgetPopup,
} from "../../../../store/slices/app-state";
import { TWipWidget } from "../../../../types";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import { useLazyDeleteWidgetByIdQuery } from "../../../../store/services/api";

interface IWidgetRowProps {
  widget: TWipWidget;
}

const rootStyles = {
  p: 3,
  display: "flex",
  alignItems: "center",
  "&:not(:last-child)": { mb: 3 },
};

const WidgetRow = ({ widget }: IWidgetRowProps) => {
  const dispatch = useAppDispatch();

  const [deleteWidget, { isLoading }] = useLazyDeleteWidgetByIdQuery();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { name, id } = widget;

  const handleEditClick = () => {
    dispatch(toggleWidgetPopup(true));
    dispatch(setActiveWidgetId(id));
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(widget.widgetLink!);
  };

  const handleDeleteClick = () => {
    deleteWidget(id!).then(() => {
      dispatch(removeWidget(id!));
    });
  };

  return (
    <Paper sx={rootStyles} variant="outlined" elevation={0}>
      <Typography variant="h6">{name}</Typography>
      <IconButton
        size="large"
        sx={{ ml: "auto" }}
        color="primary"
        onClick={handleEditClick}
      >
        <EditIcon fontSize="medium" />
      </IconButton>
      <IconButton
        size="large"
        sx={{ ml: 2 }}
        color="primary"
        onClick={handleCopyClick}
      >
        <CopyIcon fontSize="medium" />
      </IconButton>
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{ ml: 2 }}
        color="warning"
      >
        <DeleteIcon fontSize="medium" />
      </IconButton>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2} sx={{ display: "flex", flexDirection: "column" }}>
          <Typography mb={1}>
            Вы точно хотите удалить виджет "{name}"?
          </Typography>
          <Box ml="auto">
            <Button sx={{ mr: 2 }} color="warning" onClick={handleDeleteClick}>
              Удалить
            </Button>
            <Button color="primary" onClick={handleClose}>
              Отменить
            </Button>
          </Box>
        </Box>
      </Popover>
    </Paper>
  );
};

export default WidgetRow;
