import styled from "styled-components"

export default function MainText({text, color}){
    return(
        <MainTextStyle data-identifier="no-habit-message today-infos" color={color}>{`${text}`}</MainTextStyle>
    )
}

const MainTextStyle = styled.p`
width: 93vw;
font-family: "Lexend Deca";
font-weight: 400;
font-size: 17.98px;
line-height: 22.47px;
color: ${(props) => props.color};
margin: 17px auto auto auto;
`