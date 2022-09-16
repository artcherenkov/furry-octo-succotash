import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { InputAdornment } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const PrizeRow = () => {
  return (
    <Accordion
      sx={{
        "&:not(:last-child)": { mb: 2 },
      }}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Приз 1 🤍</Typography>
          <Box>
            <IconButton sx={{ mr: 1 }} size="small">
              <EditIcon />
            </IconButton>
            <IconButton size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex" }}>
              <TextField
                disabled
                sx={{ mr: 3, width: 100 }}
                size="small"
                defaultValue="1"
                label="№ сектора"
                variant="standard"
              />
              <TextField
                disabled
                size="small"
                fullWidth
                defaultValue="Приз 1 🤍"
                label="Название приза"
                variant="standard"
              />
            </Box>
            <Box mt={3} sx={{ display: "flex" }}>
              <TextField
                disabled
                fullWidth
                size="small"
                defaultValue="Лазерная эпиляция любой зоны за 500 руб."
                label="Полное название приза"
                variant="standard"
              />
            </Box>
            <Box mt={3} sx={{ display: "flex" }}>
              <TextField
                disabled
                fullWidth
                size="small"
                label="Цвет текста"
                defaultValue="ff0000"
                variant="standard"
                sx={{ mr: 3 }}
                InputProps={{
                  style: { fontFamily: "Roboto Mono" },
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        sx={{
                          mr: 1,
                          width: 13,
                          height: 13,
                          borderRadius: "2px",
                          background: "#ff0000",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled
                fullWidth
                size="small"
                label="Цвет сектора"
                defaultValue="ff0000"
                variant="standard"
                InputProps={{
                  style: { fontFamily: "Roboto Mono" },
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        sx={{
                          mr: 1,
                          width: 13,
                          height: 13,
                          borderRadius: "2px",
                          background: "#ff0000",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mt={3} sx={{ display: "flex" }}>
              <TextField
                disabled
                fullWidth
                size="small"
                defaultValue="https://some-very-long.com/link/72f1f73c-329b-11ed-a261-0242ac120002"
                label="Ссылка на запись"
                variant="standard"
              />
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PrizeRow;
