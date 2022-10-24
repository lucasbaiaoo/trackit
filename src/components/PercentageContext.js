import { createContext, useState } from "react"

const PercentageContext = createContext()

export function PercentageProvider({children}){

    const [percentage, setPercentage] = useState(0)
    return (
        <PercentageContext.Provider value={{percentage, setPercentage}}>
            {children}
        </PercentageContext.Provider>
    ) 
}

export default PercentageContext
