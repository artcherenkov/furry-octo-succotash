import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface IWidgetNameProps {
  value: string;
  disabled: boolean;

  onChange(evt: React.ChangeEvent): void;
  onBlur(): void;
  onEditClick(): void;
}

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const WidgetName = ({
  value,
  onChange,
  onBlur,
  onEditClick,
  disabled,
}: IWidgetNameProps) => {
  return (
    <Box mb={4} sx={styles}>
      <TextField
        disabled={disabled}
        sx={{ width: "90%" }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label="Название виджета"
        variant="standard"
        InputProps={{
          style: { fontSize: 22 },
        }}
      />
      <IconButton onClick={onEditClick}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default WidgetName;
