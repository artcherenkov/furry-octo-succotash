import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectShowWidgetPopup,
  toggleWidgetPopup,
} from "../../store/slices/app-state";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PrizeRow from "./components/PrizeRow";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "80vw",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const WidgetPopup = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectShowWidgetPopup);

  const handleClose = () => {
    dispatch(toggleWidgetPopup(false));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <TextField
          sx={{ width: "90%", mb: 5 }}
          defaultValue="Виджет на главной странице подружек"
          label="Название виджета"
          variant="standard"
          InputProps={{
            style: { fontSize: 22 },
          }}
        />

        <Box mb={2} sx={{ display: "flex" }}>
          <Typography variant="h6">Призы</Typography>
          <IconButton sx={{ ml: "auto" }}>
            <AddIcon />
          </IconButton>
        </Box>

        <PrizeRow />
        <PrizeRow />
        <PrizeRow />
        <PrizeRow />

        <Box mt={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ mr: 2 }} variant="contained">
            Редактировать
          </Button>
          <Button variant="contained" color="warning">
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WidgetPopup;
