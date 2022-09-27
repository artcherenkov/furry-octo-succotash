import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsAuth, setAuthToken } from "../../store/slices/app-state";
import { deleteToken } from "../../utils/local-storage";

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    dispatch(setAuthToken(undefined));
    deleteToken();
    setAnchorEl(null);
  };

  return (
    <Box m={3} mb={5} sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h4">Подружки</Typography>
      {isAuth && (
        <>
          <Button
            size="large"
            sx={{ ml: "auto", textTransform: "initial" }}
            startIcon={<AccountCircleIcon />}
            onClick={handleClick}
          >
            Профиль
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Button color="warning" onClick={onLogoutClick}>
              Выйти
            </Button>
          </Popover>
        </>
      )}
    </Box>
  );
};

export default Header;
