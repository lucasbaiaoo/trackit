import { useState } from "react"

export default function Days(){
    
    const [days, setDays] = useState({
    DOMINGO: {
        name:"D",
        id:1,
        isClicked: false
    },
    SEGUNDA: {
        name:"S",
        id:2,
        isClicked: false
    },
    TERCA: {
        name:"T",
        id:3,
        isClicked: false
    },
    QUARTA: {
        name:"Q",
        id:4,
        isClicked: false
    },
    QUINTA: {
        name:"Q",
        id:5,
        isClicked: false
    },
    SEXTA: {
        name:"S",
        id:6,
        isClicked: false
    },
    SABADO: {
        name:"S",
        id:7,
        isClicked: false
    }
    
})

const arrayDays = Object.keys(days)

return {days, setDays, arrayDays};
}
