import Box from "@mui/material/Box";
import WidgetRow from "./components/WidgetRow/WidgetRow";
import CreateWidgetButton from "./components/CreateWidgetButton/CreateWidgetButton";
import WidgetPopup from "../../components/WidgetPopup/WidgetPopup";
import { useAppSelector } from "../../store/hooks";
import {
  selectActiveWidget,
  selectWidgets,
} from "../../store/slices/app-state";
import {
  useGetWidgetsQuery,
  useGetWidgetByIdQuery,
} from "../../store/services/api";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../utils/local-storage";

const MainPage = () => {
  const navigate = useNavigate();
  const widgets = useAppSelector(selectWidgets);
  const activeWidget = useAppSelector(selectActiveWidget);

  const { error, isLoading } = useGetWidgetsQuery();

  useGetWidgetByIdQuery("8f5f8870-d1f9-4bbc-ab62-3d37eec23ce6");

  if (isLoading) {
    return <h1>"LOADING"</h1>;
  }

  if (error) {
    if ("status" in error && error.status === 401) {
      deleteToken();
      navigate("/login");
    }
    return <h1>"ERROR"</h1>;
  }

  return (
    <>
      <Box mb={5}>
        {widgets.map((w) => (
          <WidgetRow key={w.id} widget={w} />
        ))}
      </Box>
      <CreateWidgetButton />
      <WidgetPopup widget={activeWidget} />
    </>
  );
};

export default MainPage;
