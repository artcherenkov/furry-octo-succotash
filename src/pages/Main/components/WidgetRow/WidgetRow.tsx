import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CopyIcon from "@mui/icons-material/ContentCopy";
import { useAppDispatch } from "../../../../store/hooks";
import { toggleWidgetPopup } from "../../../../store/slices/app-state";

const WidgetRow = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleWidgetPopup(true));
  };

  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        "&:not(:last-child)": { mb: 3 },
      }}
      variant="outlined"
      elevation={0}
    >
      <Typography variant="h6">Виджет на главной странице подружек</Typography>
      <IconButton
        size="large"
        sx={{ ml: "auto" }}
        color="primary"
        aria-label="edit widget"
        onClick={handleClick}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        size="large"
        sx={{ ml: 2 }}
        color="primary"
        aria-label="add to shopping cart"
      >
        <CopyIcon />
      </IconButton>
    </Paper>
  );
};

export default WidgetRow;
