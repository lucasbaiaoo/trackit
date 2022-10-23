import styled from "styled-components"
import logo from "../assets/images/logo.png"

export default function Logo(){
    return(
        <LogoStyle src={logo} alt=""/>
    )
}

const LogoStyle = styled.img`
width: 180px;
height: 178.38px;
display:block;
margin: 68px auto 32.62px auto;
`