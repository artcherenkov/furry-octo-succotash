import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box m={3} mb={5} sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h4">Подружки</Typography>
      <Button
        size="large"
        sx={{ ml: "auto", textTransform: "initial" }}
        startIcon={<AccountCircleIcon />}
        onClick={handleClick}
      >
        test-login
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
        <Button color="warning">Выйти</Button>
      </Popover>
    </Box>
  );
};

export default Header;
