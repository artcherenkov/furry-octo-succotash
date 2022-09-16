import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useAppDispatch } from "../../../../store/hooks";
import { toggleWidgetPopup } from "../../../../store/slices/app-state";
import { createStyles } from "@mui/material";

const styles = createStyles({
  position: "sticky",
  bottom: 50,
  left: "50%",
  transform: "translateX(-50%)",
});

const CreateWidgetButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleWidgetPopup(true));
  };

  return (
    <Fab sx={styles} color="primary" variant="extended" onClick={handleClick}>
      <AddIcon sx={{ mr: 1 }} />
      Создать
    </Fab>
  );
};

export default CreateWidgetButton;
