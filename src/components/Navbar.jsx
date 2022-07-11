import React from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { useStateContext } from '../contexts/ContextProvider'
import { AiOutlineMenu } from 'react-icons/ai'

import { Link } from 'react-router-dom'

import mtgHubLogo from '../data/nc.webp'


const NavButton = ({ title, customFunc, icon }) => {

    return (
        <TooltipComponent content={title} position="BottomCenter">
            <button
                type="button"
                onClick={customFunc}
                className="relative text-xl rounded-full p-3 hover:bg-light-gray text-white hover:text-black"
            >
                <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
                {icon}
            </button>
        </TooltipComponent>
    )
}

const Navbar = () => {

    const { activeMenu, setActiveMenu, themeSettings, setThemeSettings } = useStateContext()

    const handleNavMenuButtonClick = () => {
        if (window.innerWidth < 1024) {
            if (themeSettings) {
                setThemeSettings(false)
            }
            setActiveMenu(prevState => !prevState)
        } else {
            setActiveMenu(prevState => !prevState)
        }
    }

    return (
        <div style={{ left: '0', zIndex: '999' }} className={`${activeMenu ? 'lg:ml-[384px]' : 'ml-0'} bg-[#3416DE] dark:bg-[#1F1D36] flex justify-start items-center p-2 fixed right-0 top-0`}>
            <NavButton
                title="Menu"
                customFunc={handleNavMenuButtonClick}
                icon={<AiOutlineMenu />}
            />
            {!activeMenu && <Link to="/" onClick={() => { }} className="items-center text-2xl gap-3 ml-3 flex font-extrabold tracking-tight dark:text-white text-slate-900">
                <img src={mtgHubLogo} alt="new capenna symbol" className="w-11" /> <span className="font-extrabold dark:text-transparent text-2xl bg-clip-text text-stone-300 dark:bg-gradient-to-r from-rose-800 to-orange-600">MTG HUB</span>
            </Link>}
        </div>
    )
}

export default Navbar