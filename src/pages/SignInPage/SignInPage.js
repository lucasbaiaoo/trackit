import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";


export default function SingInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      {
        email: email,
        name: name,
        image: image,
        password: password
      }
    );

    promise.then(() =>
      navigate("/", {
      })
    );

    promise.catch((error) => {
    alert(error.response.data.message)
    setIsLoading(false)
    })
    
  }

  return (
    <SignInPageStyle>
      <Logo />
      <form onSubmit={handleSubmit}>
        <Input type ={"text"} placeholder={"email"} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>
        <Input type ={"password"} placeholder={"senha"} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>
        <Input type ={"text"} placeholder={"nome"}  onChange={(e) => setName(e.target.value)} disabled={isLoading}/>
        <Input type ={"text"} placeholder={"foto"}  onChange={(e) => setImage(e.target.value)} disabled={isLoading}/>
        <Button text={"Cadastrar"} disabled={isLoading}/>
      </form>
      <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
    </SignInPageStyle>
  );
}

const SignInPageStyle = styled.div`
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
