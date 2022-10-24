import styled from "styled-components"
import { useContext } from "react"
import UserContext from "./UserContext"

export default function Header(){

    const {userInfo} = useContext(UserContext)
    
    return(
        <HeaderStyle>
            <p>TrackIt</p>
            <img data-identifier="avatar" src={userInfo.image} alt=""/>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
width:100vw;
height: 70px;
background-color: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
display:flex;
align-items: center;
justify-content: space-between;
p{
    font-family: "Playball";
    font-weight: 400;
    font-size:38.98px;
    line-height: 48.73px;
    color:#FFFFFF;
    margin-left: 18px;
}
img{
    width:51px;
    height: 51px;
    border-radius: 98.5px;
    object-fit: cover;
    margin-right: 18px;
}
`