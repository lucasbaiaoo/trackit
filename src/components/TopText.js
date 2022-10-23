import styled from "styled-components"

export default function TopText({text}){
    return <TopTextStyle>{`${text}`}</TopTextStyle>
}

const TopTextStyle = styled.p`
font-family: "Lexend Deca";
font-weight: 400;
font-size: 22.98px;
line-height: 28.72px;
color: #126BA5;
margin-top: 28px;
margin-left: 17px;
`