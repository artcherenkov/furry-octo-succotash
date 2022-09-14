import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

const PrizeRow = () => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        "&:not(:last-child)": { mb: 2 },
      }}
      variant="outlined"
      elevation={0}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex" }}>
          <TextField
            sx={{ mr: 3, width: 20 }}
            size="small"
            defaultValue="1"
            label="№"
            variant="standard"
          />
          <TextField
            sx={{ mr: 3, width: 200 }}
            size="small"
            defaultValue="Лазер бикини"
            label="Название приза"
            variant="standard"
          />
          <TextField
            size="small"
            sx={{ width: 20 }}
            type="color"
            label=" "
            defaultValue="#ff0000"
            variant="standard"
          />
          <Typography mt={2} ml={1}>
            #ff0000
          </Typography>
        </Box>
        <Box>
          <TextField
            sx={{ mt: 3, width: "80%" }}
            size="small"
            defaultValue="https://some-very-long.com/link/72f1f73c-329b-11ed-a261-0242ac120002"
            label="Ссылка на запись"
            variant="standard"
          />
        </Box>
      </Box>

      <IconButton sx={{ ml: "auto" }}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default PrizeRow;
