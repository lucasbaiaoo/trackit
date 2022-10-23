import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../../components/UserContext";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const localData = localStorage.getItem("user info");
    if (localData !== "[]") {
      navigate("/hoje");
    } 
  });

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      {
        email: email,
        password: password,
      }
    );

    promise.then((answer) => {
      setUserInfo(answer.data);
      navigate("/hoje", {});
    });

    promise.catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
  }
  return (
    <LoginPageStyle>
      <Logo />
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"email"}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          color={"##DBDBDB"}
        />
        <Input
          type={"password"}
          placeholder={"senha"}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <Button text={"Entrar"} disabled={isLoading} />
      </form>
      <Link to="/cadastro">
        <p>Não tem uma conta? Cadastre-se</p>
      </Link>
    </LoginPageStyle>
  );
}

const LoginPageStyle = styled.div`
  p {
    text-align: center;
    font-family: "Lexend Deca";
    font-weight: 400;
    font-size: 13.98px;
    line-height: 17.47px;
    color: #52b6ff;
    text-decoration: underline;
  }
`;
