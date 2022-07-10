import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { DialogComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, Loading, ThemeSettings } from './components'
import { Home, CardList, RandomCard } from './pages'
import './App.css'

import appBG from './data/app-bg.png'

import { useStateContext } from './contexts/ContextProvider'

const App = () => {

    const {
        activeMenu,
        setActiveMenu,
        loading,
        cardPopupOpen,
        setCardPopupOpen,
        selectedCard,
        themeSettings,
        setThemeSettings,
        currentMode
    } = useStateContext()

    const handleResize = () => {
        if (window.innerWidth <= 1023) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }

    const cardPopupAnimationSettings = { effect: 'Zoom', duration: 400, delay: 0 };


    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <div className={currentMode === 'Dark' ? 'dark h-full' : 'h-full'}>
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    <div className="fixed right-8 bottom-8" style={{ zIndex: '1000' }}>
                        <TooltipComponent content="Settings" position="Top">
                            <button
                                type="button"
                                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray dark:hover:text-black hover:text-black text-white bg-black dark:bg-[#33373E] dark:hover:bg-light-gray"
                                style={{ borderRadius: '50%' }}
                                onClick={() => setThemeSettings(true)}
                            >
                                <FiSettings />
                            </button>
                        </TooltipComponent>
                    </div>

                    <div className="w-96 fixed sidebar dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>

                    <div style={{
                        minHeight: '100vh',
                        background: `url(${appBG})`,
                        backgroundAttachment: 'fixed',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 10%',
                        backgroundRepeat: 'no-repeat'
                    }} className={`dark:bg-[#242424] h-full ${activeMenu ? "lg:ml-96 w-full bg-stone-100" : "ml-0 w-full bg-stone-100"}`}>
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                            {<Navbar />}
                        </div>
                        <div>

                            {themeSettings && <ThemeSettings />}

                            <Routes>
                                {/* Navigation */}
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />

                                {/* Featured */}
                                {/* <Route path="/orders" element={<Orders />} />
                                <Route path="/employees" element={<Employees />} />
                                <Route path="/customers" element={<Customers />} /> */}

                                {/* Cards */}
                                <Route path="/cards/all" element={<CardList />} />
                                <Route path="/random" element={<RandomCard />} />

                                {/* Sets */}
                                <Route path="/sets/:setId" element={<CardList />} />

                            </Routes>
                        </div>
                        <DialogComponent style={{ maxWidth: '1500px' }} cssClass={`${currentMode === 'Dark' ? 'card-dialog-dark' : 'card-dialog-light'}`} id="cardModal" isModal showCloseIcon={true} animationSettings={cardPopupAnimationSettings} visible={cardPopupOpen && selectedCard} width={'90%'} header={`Learn more about ${selectedCard?.name}`} close={() => setCardPopupOpen(false)}>
                            <div className="flex-col lg:flex-row flex justify-between lg:justify-center w-full h-auto min-h-96 max-h-auto mr-auto ml-auto">
                                <div className="w-full mt-5 order-2 lg:order-1">
                                    <div style={{ borderColor: `${currentMode === 'Dark' ? '#A21537' : 'initial'}` }} className="flex justify-between text-sm font-medium border-b-[3px] pb-2 mt-4">
                                        <h2 style={{ fontSize: '16px' }}>Name</h2>
                                        <p className="text-lg font-normal">{selectedCard?.name}</p>
                                    </div>
                                    <div style={{ borderColor: `${currentMode === 'Dark' ? '#A21537' : 'initial'}` }} className="flex justify-between text-sm font-medium border-b-[3px] pb-2 mt-4">
                                        <h2 style={{ fontSize: '16px' }}>Total mana cost</h2>
                                        <p className="text-lg font-normal">{selectedCard?.cmc}</p>
                                    </div>
                                    <div style={{ borderColor: `${currentMode === 'Dark' ? '#A21537' : 'initial'}` }} className="flex justify-between text-sm font-medium border-b-[3px] pb-2 mt-4">
                                        <h2 style={{ fontSize: '16px' }}>Type</h2>
                                        <p className="text-lg font-normal">{selectedCard?.type}</p>
                                    </div>
                                    <div style={{ borderColor: `${currentMode === 'Dark' ? '#A21537' : 'initial'}` }} className="flex justify-between text-sm font-medium border-b-[3px] pb-2 mt-4">
                                        <h2 style={{ fontSize: '16px' }}>Set name</h2>
                                        <p className="text-lg font-normal">{selectedCard?.setName}</p>
                                    </div>
                                    <div style={{ borderColor: `${currentMode === 'Dark' ? '#A21537' : 'initial'}` }} className="flex justify-between text-sm font-medium border-b-[3px] pb-2 mt-4">
                                        <h2 style={{ fontSize: '16px' }}>Rarity</h2>
                                        <p className="text-lg font-normal">{selectedCard?.rarity}</p>
                                    </div>
                                    <div style={{ borderColor: `${currentMode === 'Dark' ? '#A21537' : 'initial'}` }} className="flex justify-between text-sm font-medium border-b-[3px] pb-2 mt-4">
                                        <h2 style={{ fontSize: '16px' }}>Power</h2>
                                        <p className="text-lg">{selectedCard?.power || "N/A"}</p>
                                    </div>
                                    <div style={{ borderColor: `${currentMode === 'Dark' ? '#A21537' : 'initial'}` }} className="flex justify-between text-sm font-medium border-b-[3px] pb-2 mt-4">
                                        <h2 style={{ fontSize: '16px' }}>Toughness</h2>
                                        <p className="text-lg">{selectedCard?.toughness || "N/A"}</p>
                                    </div>
                                    <div style={{ overflowY: 'scroll', borderColor: `${currentMode === 'Dark' ? '#A21537' : 'initial'}` }} className="flex justify-between text-sm font-medium border-b-[3px] pb-2 mt-4 max-h-52">
                                        <h2 style={{ fontSize: '16px' }}>Text</h2>
                                        <p className="text-lg max-w-md pr-3 pt-10 lg:pt-0">{selectedCard?.text}</p>
                                    </div>
                                </div>
                                <div className="w-[80%] lg:w-[650px] block mx-auto order-1 lg:ml-5 lg:order-2">
                                    <img style={{ borderRadius: '1.3rem' }} title={selectedCard?.name} className="w-full object-contain" src={(selectedCard?.imageUrl || selectedCard?.image_uris?.large || selectedCard?.card_faces?.[0]?.image_uris?.large) || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxmQH85oJQYthg6KgnjmCX3ty-PPZkn-rHg&usqp=CAU"} alt="card art" />
                                </div>
                            </div>
                        </DialogComponent>
                        {loading && <Loading />}
                    </div>


                </div>
            </BrowserRouter >
        </div >
    )
}
export default App
