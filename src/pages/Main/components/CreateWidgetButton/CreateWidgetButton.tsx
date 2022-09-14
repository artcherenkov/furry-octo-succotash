import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useAppDispatch } from "../../../../store/hooks";
import { toggleWidgetPopup } from "../../../../store/slices/app-state";

const CreateWidgetButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleWidgetPopup(true));
  };

  return (
    <Fab
      color="primary"
      variant="extended"
      onClick={handleClick}
      sx={{
        position: "sticky",
        bottom: 50,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <AddIcon sx={{ mr: 1 }} />
      Создать
    </Fab>
  );
};

export default CreateWidgetButton;
