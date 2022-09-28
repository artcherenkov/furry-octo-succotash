import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useLazyLoginQuery } from "../../store/services/api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const [postLogin, { isLoading, error }] = useLazyLoginQuery();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      login: "podruge",
      password: "74asd103",
    },
  });

  const onSubmit = (data: { login: string; password: string }) => {
    postLogin(data)
      .unwrap()
      .then(() => navigate("/"));
  };

  const renderError = (error: any) => {
    if (error.status === 401) {
      return <p>Неверный логин или пароль</p>;
    }

    return <p>Произошла неизвестная ошибка</p>;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 420,
        m: "0 auto",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="login"
        control={control}
        render={({ field }) => (
          <TextField sx={{ mb: 3 }} label="Логин" {...field} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <TextField label="Пароль" {...field} />}
      />

      <Button
        sx={{ mt: 5, width: 200, alignSelf: "center" }}
        type="submit"
        variant="contained"
      >
        {isLoading ? "..." : "Войти"}
      </Button>

      {error && renderError(error)}
    </Box>
  );
};

export default LoginPage;
