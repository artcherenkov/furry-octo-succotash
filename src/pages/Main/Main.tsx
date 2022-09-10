import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import WidgetRow from "./components/WidgetRow/WidgetRow";
import { Fab } from "@mui/material";

const MainPage = () => {
  return (
    <>
      <Box mb={5}>
        <WidgetRow />
        <WidgetRow />
      </Box>

      <Fab
        color="primary"
        variant="extended"
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
    </>
  );
};

export default MainPage;
