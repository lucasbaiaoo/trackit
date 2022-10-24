import styled from "styled-components";
import Header from "../../components/Header";
import TopText from "../../components/TopText";
import Footer from "../../components/Footer";
import MainText from "../../components/MainText";

export default function RecordPage(){
    return(
        <RecordPageStyle>
            <Header/>
            <TopText text={"Histórico"}/>
            <MainText color="#666666" text={"Em breve você poderá ver o histórico dos seus hábitos aqui"}/>
            <Footer/>
        </RecordPageStyle>
    )
}

const RecordPageStyle = styled.div`
height: 100vh;
background-color: #f2f2f2;
`