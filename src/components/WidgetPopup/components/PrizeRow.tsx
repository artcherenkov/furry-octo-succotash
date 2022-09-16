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
import { TPrizeField } from "../../../types";

interface IPrizeRowProps {
  field: TPrizeField;
}

const PrizeRow = ({ field }: IPrizeRowProps) => {
  return (
    <Accordion
      sx={{
        "&:not(:last-child)": { mb: 2 },
      }}
    >
      <AccordionSummary>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>{field.text}</Typography>
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
                defaultValue={field.text}
                label="Название приза"
                variant="standard"
              />
            </Box>
            <Box mt={3} sx={{ display: "flex" }}>
              <TextField
                disabled
                fullWidth
                size="small"
                defaultValue={field.fullText}
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
                defaultValue={field.textColor.toLowerCase().slice(1)}
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
                          background: field.textColor.toLowerCase(),
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
                defaultValue={field.color.toLowerCase().slice(1)}
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
                          background: field.color.toLowerCase(),
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
                defaultValue={field.url}
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
