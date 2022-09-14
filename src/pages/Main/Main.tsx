import Box from "@mui/material/Box";
import WidgetRow from "./components/WidgetRow/WidgetRow";
import CreateWidgetButton from "./components/CreateWidgetButton/CreateWidgetButton";
import WidgetPopup from "../../components/WidgetPopup/WidgetPopup";

const MainPage = () => {
  return (
    <>
      <Box mb={5}>
        <WidgetRow />
        <WidgetRow />
      </Box>
      <CreateWidgetButton />
      <WidgetPopup />
    </>
  );
};

export default MainPage;
