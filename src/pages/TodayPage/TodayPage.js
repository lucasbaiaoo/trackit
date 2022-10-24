import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import TopText from "../../components/TopText";
import Footer from "../../components/Footer";
import MainText from "../../components/MainText";
import UserContext from "../../components/UserContext";
import PercentageContext from "../../components/PercentageContext";

export default function TodayPage() {
  const { userInfo } = useContext(UserContext);
  const { percentage ,setPercentage} = useContext(PercentageContext)

  const [userTodayHabits, setUserTodayHabits] = useState([]);
  const [amountOfCompletedTodayHabits, setAmountOfCompletedTodayHabits] = useState(0)
  setPercentage(parseInt((amountOfCompletedTodayHabits/userTodayHabits.length)*100));  

  useEffect(() => {
    const promise1 = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );

    promise1.then((answer) => {
      let alreadyCompletedTodayHabits = 0;

      for(let i = 0; i < answer.data.length; i++){
        if(answer.data[i].done === true){
          alreadyCompletedTodayHabits += 1
        }
      }
      setAmountOfCompletedTodayHabits(alreadyCompletedTodayHabits)
      setUserTodayHabits(answer.data);
    });
  }, []);

  function handleCheck(todayHabit) {

    if (todayHabit.done === false) {
      const promise2 = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${todayHabit.id}/check`,
        {},
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );

      promise2.then(() => {
        setAmountOfCompletedTodayHabits(amountOfCompletedTodayHabits + 1)
      })
    } else {
      const promise3 = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${todayHabit.id}/uncheck`,
        {},
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );

      promise3.then(() => {
        setAmountOfCompletedTodayHabits(amountOfCompletedTodayHabits - 1)
      })
    } 
    
    const promise4 = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );

    promise4.then((answer) => {
      setUserTodayHabits(answer.data);
    });

  }

  return (
    <TodayPageStyle>
      <Header />
      <TopText 
      data-identifier="today-infos"
        text={`${dayjs().locale("pt-br").format("dddd")}, ${dayjs().format(
          "DD/MM"
        )}`}
      />
      <MainText color={percentage !== 0 && userTodayHabits.length > 0 ? "#8FC549"  : "#BABABA"} text={percentage !== 0 && userTodayHabits.length > 0 ? `${percentage}% dos hábitos concluídos`: "Nenhum hábito concluído ainda."} />
      <TodayHabitsBox>
        {userTodayHabits.map((todayHabit) => (
          <TodayHabitBox>
            <TextBox data-identifier="today-infos">
              <h2>{todayHabit.name}</h2>
              <h1>Sequência atual:<ColorChanginText color={todayHabit.done ? "#8FC549" : "#666666"}>{todayHabit.currentSequence} dia(s)</ColorChanginText></h1>
              <h1>Seu recorde:<ColorChanginText color={todayHabit.done && todayHabit.currentSequence === todayHabit.highestSequence ? "#8FC549" : "#666666"}>{todayHabit.highestSequence} dia(s)</ColorChanginText></h1>
            </TextBox>
            <CheckboxBox>
              <Checkbox
                onClick={() => handleCheck(todayHabit)}
                backgroundcolor={todayHabit.done ? "#8FC549" : "#EBEBEB"}
                data-identifier="done-habit-btn"
              >
                <ion-icon name="checkmark-outline"></ion-icon>
              </Checkbox>
            </CheckboxBox>
          </TodayHabitBox>
        ))}
      </TodayHabitsBox>
      <Footer />
    </TodayPageStyle>
  );
}

const TodayPageStyle = styled.div`
  height: 100vh;
  background-color: #f2f2f2;
`;

const TodayHabitsBox = styled.div``;

const TodayHabitBox = styled.div`
  height: 81px;
  width: 93vw;
  border-radius: 5px;
  margin: 20px auto auto auto;
  background-color: #ffffff;
  padding-top: 13px;
  display: flex;
  justify-content: space-between;
`;

const TextBox = styled.div`
width: 100%;
  h2 {
    font-family: "Lexend Deca";
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 7px;
    margin-left: 15px;
    color: #666666;
  }
  h1 {
    display: flex;
    flex-direction: row;
    font-family: "Lexend Deca";
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: #666666;
    margin-left: 15px;
  }
`;

const ColorChanginText = styled.p`
  font-family: "Lexend Deca";
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  margin-left:4px;
  color: ${(props) => props.color};
`;


const Checkbox = styled.div`
  height: 69px;
  width: 69px;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  * {
    font-size: 50px;
  }
`;

const CheckboxBox = styled.div`
  margin-right: 15px;
`;
