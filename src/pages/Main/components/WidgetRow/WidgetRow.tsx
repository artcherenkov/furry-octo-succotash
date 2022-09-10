import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CopyIcon from "@mui/icons-material/ContentCopy";

const WidgetRow = () => {
  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        "&:not(:last-child)": { mb: 3 },
      }}
      variant="outlined"
      elevation={0}
    >
      <Typography variant="h6">Название</Typography>
      <IconButton
        size="large"
        sx={{ ml: "auto" }}
        color="primary"
        aria-label="edit widget"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        size="large"
        sx={{ ml: 2 }}
        color="primary"
        aria-label="add to shopping cart"
      >
        <CopyIcon />
      </IconButton>
    </Paper>
  );
};

export default WidgetRow;
