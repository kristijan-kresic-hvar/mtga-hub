import React, { createContext, useContext, useState, useEffect } from 'react'

const StateContext = createContext()

export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true)
    const [loading, setLoading] = useState(false)
    const [cardPopupOpen, setCardPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [selectedSet, setSelectedSet] = useState({})
    const [totalCards, setTotalCards] = useState()
    const [currentMode, setCurrentMode] = useState(localStorage.getItem('themeMode') || "Light")
    const [themeSettings, setThemeSettings] = useState(false)

    useEffect(() => {
        localStorage.setItem('themeMode', currentMode)
    }, [currentMode])

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                loading,
                setLoading,
                cardPopupOpen,
                setCardPopupOpen,
                selectedCard,
                setSelectedCard,
                selectedSet,
                setSelectedSet,
                totalCards,
                setTotalCards,
                currentMode,
                setCurrentMode,
                themeSettings,
                setThemeSettings,
                setCurrentMode
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)