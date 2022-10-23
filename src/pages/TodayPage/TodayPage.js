import styled from "styled-components";
import Header from "../../components/Header";
import TopText from "../../components/TopText";
import Footer from "../../components/Footer";


export default function TodayPage(){
    return(
        <TodayPageStyle>
            <Header/>
            <TopText text={"Sexta, 21/10"}/>
            <Footer/>
        </TodayPageStyle>
    )
}

const TodayPageStyle = styled.div`
height: 100vh;
background-color:#F2F2F2;
`