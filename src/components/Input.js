import styled from "styled-components";

export default function Input({ type, placeholder, value, onChange, disabled }) {
  return <InputStyle type={type} placeholder={`${placeholder}`} value={value} onChange={onChange} disabled={disabled}></InputStyle>;
}

const InputStyle = styled.input`
  width: 303px;
  height: 45px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  display: block;
  margin: auto auto 6px auto;
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 19.98px;
  line-height: 24.97px;
  color: #dbdbdb;
  &:disabled{
    filter: brightness(0.8);
  }
`;
