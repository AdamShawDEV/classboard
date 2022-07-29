import { createContext, useState } from "react"

export const ClassNameContext = createContext();

function ClassNameContextProvider({ children }) {
    const [currentClassName, setCurrentClassName] = useState('');

    return (
        <ClassNameContext.Provider value={{ currentClassName, setCurrentClassName }}>
            {children}
        </ClassNameContext.Provider>
    );
}

export default ClassNameContextProvider;