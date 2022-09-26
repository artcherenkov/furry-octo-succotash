import { useNavigate } from "react-router-dom";
import { useLazyLoginQuery } from "../../store/services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLazyLoginQuery();

  const onClick = () => {
    login({ login: "podruge", password: "74asd103" }).then(() => navigate("/"));
  };

  return (
    <div>
      <h1>login page</h1>
      <button onClick={onClick}>{isLoading ? "..." : "click me"}</button>
    </div>
  );
};

export default LoginPage;
