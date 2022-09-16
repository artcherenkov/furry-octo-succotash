import Box from "@mui/material/Box";
import WidgetRow from "./components/WidgetRow/WidgetRow";
import CreateWidgetButton from "./components/CreateWidgetButton/CreateWidgetButton";
import WidgetPopup from "../../components/WidgetPopup/WidgetPopup";
import { WIDGET } from "../../mocks/data";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectActiveWidget,
  selectWidgets,
  setWidgets,
} from "../../store/slices/app-state";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const widgets = useAppSelector(selectWidgets);
  const activeWidget = useAppSelector(selectActiveWidget);

  useEffect(() => {
    dispatch(setWidgets([WIDGET]));
  }, []);

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
