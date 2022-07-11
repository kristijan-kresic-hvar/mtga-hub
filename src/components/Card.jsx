import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const Card = (props) => {
    const { setCardPopupOpen, setSelectedCard, currentMode } = useStateContext()

    const handleCardClick = (card) => {
        if (!card) return false

        setSelectedCard({})

        setTimeout(() => {
            setSelectedCard(card)
        }, 500)

        setCardPopupOpen(true)
    }

    return (
        <>
            <div style={{ borderRadius: '1.1rem' }} onClick={() => handleCardClick(props?.cardValues)} className="select-none transition-all ease-in-out duration-200ms border-transparent border-[3px] hover:border-[#3416DE] dark:hover:border-orange-600 w-4/5 hover:shadow-md hover:shadow-black cursor-pointer hover:scale-105 ml-auto mr-auto">
                <img style={{ borderRadius: '1.1rem' }} title={props?.cardValues?.name} src={(props?.cardValues?.imageUrl || props?.cardValues?.image_uris?.normal || props?.cardValues?.card_faces?.[0]?.image_uris?.normal) || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxmQH85oJQYthg6KgnjmCX3ty-PPZkn-rHg&usqp=CAU"} alt="card thumbnail" className="w-full object-contain h-full" />
            </div>
        </>
    )
}

export default Card