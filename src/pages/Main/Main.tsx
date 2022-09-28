import Box from "@mui/material/Box";
import WidgetRow from "./components/WidgetRow/WidgetRow";
import CreateWidgetButton from "./components/CreateWidgetButton/CreateWidgetButton";
import WidgetPopup from "../../components/WidgetPopup/WidgetPopup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectActiveWidget,
  selectLastCreatedWidgetLink,
  selectShowCopyWidgetLinkPopup,
  selectWidgets,
  setAuthToken,
  setLastCreatedWidgetLink,
  setShowCopyWidgetLinkPopup,
} from "../../store/slices/app-state";
import { useGetWidgetsQuery } from "../../store/services/api";
import { deleteToken } from "../../utils/local-storage";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

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
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
};

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const widgets = useAppSelector(selectWidgets);
  const activeWidget = useAppSelector(selectActiveWidget);

  const showCopyWidgetLinkPopup = useAppSelector(selectShowCopyWidgetLinkPopup);
  const lastCreatedWidgetLink = useAppSelector(selectLastCreatedWidgetLink);

  const { error, isLoading } = useGetWidgetsQuery();

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  if (error) {
    if ("status" in error && error.status === 401) {
      deleteToken();
      dispatch(setAuthToken(undefined));
      navigate("/login");
    }
  }

  const onCopyLinkModalClose = () => {
    dispatch(setLastCreatedWidgetLink(undefined));
    dispatch(setShowCopyWidgetLinkPopup(false));
  };

  const onCopyLinkButtonClick = () => {
    if (lastCreatedWidgetLink) {
      navigator.clipboard.writeText(lastCreatedWidgetLink);
    }
  };

  return (
    <>
      <Box mb={5}>
        {widgets.map((w) => (
          <WidgetRow key={w.id} widget={w} />
        ))}
      </Box>
      <CreateWidgetButton />
      <WidgetPopup widget={activeWidget} />
      <Modal open={showCopyWidgetLinkPopup} onClose={onCopyLinkModalClose}>
        <Box sx={style}>
          <Typography mb={3} variant="h4">
            Виджет создан
          </Typography>
          <Button
            sx={{ width: 300, m: "0 auto" }}
            variant="contained"
            onClick={onCopyLinkButtonClick}
          >
            Скопировать ссылку
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MainPage;
