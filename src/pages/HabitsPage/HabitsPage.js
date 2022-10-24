import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import TopText from "../../components/TopText";
import Footer from "../../components/Footer";
import MainText from "../../components/MainText";
import Input from "../../components/Input";
import loading from "../../assets/images/loading.svg";
import useDays from "../../components/Days";
import UserContext from "../../components/UserContext";

export default function HabitsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { days, setDays, arrayDays } = useDays();
  const [showCreateHabitsBox, setShowCreateHabitsBox] = useState(false);
  const [habitName, setHabitName] = useState("");
  const { userInfo } = useContext(UserContext);
  const [userHabits, setUserHabits] = useState([]);

  function addClick(day) {
    days[day].isClicked = true;
    setDays({ ...days });
  }

  function removeClick(day) {
    days[day].isClicked = false;
    setDays({ ...days });
  }

  function Click(day) {
    if (days[day].isClicked === false) {
      addClick(day);
    } else {
      removeClick(day);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const chosenDays = arrayDays.filter((day) => days[day].isClicked === true);

    const daysIds = [];

    for (let i = 0; i < chosenDays.length; i++) {
      daysIds.push(days[chosenDays[i]].id);
    }

    const promise1 = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",

      {
        name: habitName,
        days: daysIds,
      },
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );

    promise1.then(() => {
      setIsLoading(false);
      setShowCreateHabitsBox(false);
      setHabitName("");
      arrayDays.forEach((day)=> {
        days[day].isClicked = false
      })
      const promise2 = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );
  
      promise2.then((answer) => {
        setUserHabits(answer.data);
      });
    });

    promise1.catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
    
  }

  function hideCreateHabitsBox() {
    setShowCreateHabitsBox(false);
  }

  useEffect(() => {
    const promise2 = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );

    promise2.then((answer) => {
      setUserHabits(answer.data);
    });
  }, []); 

  function deleteHabit(userHabitsId) {

    const text = "Você realmente gostaria de apagar o hábito?";
    if (window.confirm(text) === true) {
      const promise3 = axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${userHabitsId}`,
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    
    const promise4 = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );

    promise4.then((answer) => {
      setUserHabits(answer.data);
    });

    }
  }

  return (
    <HabitsPageStyle>
      <Header />
      <TopText text={"Meus Hábitos"}/>
      <TopButton  data-identifier="create-habit-btn" onClick={() => setShowCreateHabitsBox(!showCreateHabitsBox)}>
        +
      </TopButton>
      <form onSubmit={handleSubmit}>
        <CreateHabitsBox display={showCreateHabitsBox ? "block" : "none"}>
          <Input
            type={"text"}
            placeholder={"nome do hábito"}
            disabled={isLoading}
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          ></Input>
          <MiddleButtonsBox>
            {arrayDays.map((day) => (
              <MiddleButton
                onClick={() => {
                  Click(day);
                }}
                disabled={isLoading}
                color={days[day].isClicked ? "#ffffff" : "#d4d4d4"}
                backgroundcolor={ days[day].isClicked  ? "#d4d4d4" : "#ffffff"}
                type="button"
              >
                {days[day].name}
              </MiddleButton>
            ))}
          </MiddleButtonsBox>
          <BottomButtonBox>
            <BottomButton
              onClick={hideCreateHabitsBox}
              backgroundcolor="#FFFFFF"
              color="#52B6FF"
              marginright="17px"
              disabled={isLoading}
              type="button"
              data-identifier="cancel-habit-create-btn"
            >
              Cancelar
            </BottomButton>
            <BottomButton
              backgroundcolor="#52B6FF"
              color="#FFFFFF"
              disabled={isLoading}
              data-identifier="save-habit-create-btn"
              >
              {isLoading ? <img src={loading} alt="" /> : "Salvar"}
            </BottomButton>
          </BottomButtonBox>
        </CreateHabitsBox>
      </form>
      <HabitsBox>
        <MainText
          text={userHabits.length === 0 ? "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!" : 
            ""
          }
         color="#666666"
        />
        {userHabits.map((habit) => (
          <HabitBox>
            <HabitTitle data-identifier="input-habit-name">
              {habit.name}
              <TrashCanIconStyle data-identifier="delete-habit-btn">
                <ion-icon name="trash-outline" onClick={() => deleteHabit(habit.id)}></ion-icon>
              </TrashCanIconStyle>
            </HabitTitle>
            <DaysBox>
              {arrayDays.map((day) => (
                <DayBox data-identifier="week-day-btn" backgroundcolor={habit.days.includes(days[day].id) ?  "#CFCFCF" : "#FFFFFF"} 
                color={habit.days.includes(days[day].id) ?  "#FFFFFF": "#CFCFCF" }>{days[day].name}</DayBox>
              ))}
            </DaysBox>
          </HabitBox>
        ))}
      </HabitsBox>
      <Footer />
    </HabitsPageStyle>
  );
}

const HabitsPageStyle = styled.div`
  height: 100vh;
  background-color: #f2f2f2;
`;

const TopButton = styled.button`
  width: 40px;
  height: 35px;
  border: none;
  border-radius: 4.64px;
  background-color: #52b6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lexend Deca";
  font-size: 27px;
  font-weight: 400;
  line-height: 34px;
  color: #ffffff;
  position: fixed;
  top: 92px;
  right: 16px;
  cursor: pointer;
`;

const CreateHabitsBox = styled.div`
  width: 93vw;
  height: 180px;
  border-radius: 5px;
  background-color: #ffffff;
  margin: 20px auto auto auto;
  padding-top: 18px;
  display: ${(props) => props.display};
  input {
    width: 83vw;
  }
`;

const MiddleButtonsBox = styled.div`
  width: 83vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const MiddleButton = styled.button`
  width: 30px;
  height: 30px;
  border: solid 1px #d4d4d4;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 19.98px;
  line-height: 24.87x;
  cursor: pointer;
`;

const BottomButtonBox = styled.div`
  width: 83vw;
  margin: auto;
  display: flex;
  justify-content: end;
  margin-top: 29px;
`;

const BottomButton = styled.button`
  width: 84px;
  height: 35px;
  border-radius: 4.64px;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  border: none;
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 15.98px;
  line-height: 19.97px;
  margin-right: ${(props) => props.marginright};
  cursor: pointer;
  img {
    width: 45px;
    height: 35px;
  }
`;

const HabitsBox = styled.div``;

const HabitBox = styled.div`
  width: 93vw;
  height: 91px;
  border-radius: 5px;
  background-color: #ffffff;
  margin: 20px auto auto auto;
  padding-top: 18px;
`;

const HabitTitle = styled.div`
  width: 83vw;
  height: 45px;
  margin: auto auto 6px auto;
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 19.98px;
  line-height: 24.97px;
  color: #666666;
  display: flex;
  justify-content: space-between;
`;
const DaysBox = styled.div`
  width: 83vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const DayBox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #d4d4d4;
  border-radius: 5px;
  color: #d4d4d4;
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 19.98px;
  line-height: 24.87x;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
`;

const TrashCanIconStyle = styled.div`
cursor:pointer;
`;
