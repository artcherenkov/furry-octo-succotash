import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectShowWidgetPopup,
  setActiveWidgetId,
  toggleWidgetPopup,
} from "../../store/slices/app-state";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PrizeRow from "./components/PrizeRow";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { TWidget } from "../../types";

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
};

interface IWidgetPopupProps {
  widget: TWidget | Omit<TWidget, "id"> | undefined;
}

const EMPTY_WIDGET = {
  name: "",
  fields: [
    {
      text: "Приз 1",
      fullText: "",
      url: "",
      color: "#1e9cb2",
      textColor: "#e6ffff",
    },
    {
      text: "Приз 2",
      fullText: "",
      url: "",
      color: "#e6ffff",
      textColor: "#1e96b4",
    },
  ],
};

const WidgetPopup = ({ widget }: IWidgetPopupProps) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectShowWidgetPopup);

  const widgetToUse = widget || EMPTY_WIDGET;

  const handleClose = () => {
    dispatch(toggleWidgetPopup(false));
    dispatch(setActiveWidgetId(undefined));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          mb={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            disabled
            sx={{ width: "90%" }}
            defaultValue={widgetToUse.name}
            label="Название виджета"
            variant="standard"
            InputProps={{
              style: { fontSize: 22 },
            }}
          />
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>

        <Box mb={2} sx={{ display: "flex" }}>
          <Typography variant="h6">Призы</Typography>
          <IconButton sx={{ ml: "auto" }}>
            <AddIcon />
          </IconButton>
        </Box>

        {widgetToUse.fields.map((f) => (
          <PrizeRow key={f.text} field={f} />
        ))}
      </Box>
    </Modal>
  );
};

export default WidgetPopup;
