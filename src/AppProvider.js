import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [content, setContent] = useState([]);
    const [prevData, setPrevData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [nextData, setNextData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AppContext.Provider
            value={{
                content,
                setContent,
                prevData,
                setPrevData,
                currentData,
                setCurrentData,
                nextData,
                setNextData,
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;