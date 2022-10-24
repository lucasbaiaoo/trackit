import styled from "styled-components";
import loading from "../assets/images/loading.svg"

export default function Button({ text, disabled }) {
  return <ButtonStyle data-identifier="login-btn" disabled={disabled}>{disabled ? <img src={loading} alt=""/> : `${text}`}</ButtonStyle>;
}

const ButtonStyle = styled.button`
  width: 309px;
  height: 45px;
  border: none;
  border-radius: 4.64px;
  background-color: #52b6ff;
  display: block;
  margin: auto auto 25px auto;
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 20.98px;
  line-height: 26.22px;
  color: #ffffff;
  cursor: pointer;
  &:disabled{
    cursor: default;
    opacity:0.7;
  }
  img{
    width: 45px;
    height: 45px;

  }
`;
