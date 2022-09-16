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
import EditIcon from "@mui/icons-material/Edit";

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

const WidgetPopup = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectShowWidgetPopup);

  const handleClose = () => {
    dispatch(toggleWidgetPopup(false));
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
            defaultValue="Виджет на главной странице подружек"
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

        <PrizeRow />
        <PrizeRow />
        <PrizeRow />
        <PrizeRow />
      </Box>
    </Modal>
  );
};

export default WidgetPopup;
