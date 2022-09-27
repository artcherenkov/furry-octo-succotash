import Box from "@mui/material/Box";
import WidgetRow from "./components/WidgetRow/WidgetRow";
import CreateWidgetButton from "./components/CreateWidgetButton/CreateWidgetButton";
import WidgetPopup from "../../components/WidgetPopup/WidgetPopup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectActiveWidget,
  selectWidgets,
  setAuthToken,
} from "../../store/slices/app-state";
import { useGetWidgetsQuery } from "../../store/services/api";
import { deleteToken } from "../../utils/local-storage";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const widgets = useAppSelector(selectWidgets);
  const activeWidget = useAppSelector(selectActiveWidget);

  const { error, isLoading } = useGetWidgetsQuery();

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  if (error) {
    if ("status" in error && error.status === 401) {
      deleteToken();
      dispatch(setAuthToken(undefined));
    }
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
