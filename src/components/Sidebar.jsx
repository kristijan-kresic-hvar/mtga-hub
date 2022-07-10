import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import mtgHubLogo from '../data/nc.webp'
import { MdOutlineCancel } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ProgressButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { BiHomeAlt } from 'react-icons/bi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { GiPerspectiveDiceSixFacesRandom, GiCardRandom } from 'react-icons/gi';
import { FiLogIn } from 'react-icons/fi';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import { useStateContext } from '../contexts/ContextProvider'

import { getAllSets } from '../api'

const Sidebar = () => {

    const { activeMenu, setActiveMenu, setLoading, currentMode } = useStateContext()

    const loadMoreRef = useRef()
    const toTopRef = useRef()
    const sidebarRef = useRef()

    const [sets, setSets] = useState([])
    const [visible, setVisible] = useState(15);

    useEffect(() => {
        getAllSets()
            .then(data => {
                const children = data.data.filter(item => item?.parent_set_code)
                const parents = data.data.filter(item => !item.hasOwnProperty('parent_set_code'))

                const mutatedData = parents.map(parent => ({
                    ...parent,
                    children: children.filter(child => child.parent_set_code === parent.code).map(child => child && child)
                }))

                setSets(mutatedData)
            })
            .catch(error => console.error(error))
    }, [])

    const loadMoreSets = () => {
        setTimeout(() => {
            setVisible((prevValue) => prevValue + 15);
        }, 2000)

        setTimeout(() => {
            loadMoreRef.current.scrollIntoView({ behavior: 'smooth' })
        }, 2300)
    };

    const activeLink = "whitespace-pre-wrap transition-all ease-in-out flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 bg-light-gray dark:text-white dark:bg-gradient-to-r from-rose-800 to-orange-600"
    const normalLink = "whitespace-pre-wrap transition-all ease-in-out flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2"

    useEffect(() => {
        sets.length > 0 ? setLoading(false) : setLoading(true)
    }, [sets])

    return (

        <div ref={sidebarRef} style={{ display: `${activeMenu ? "block" : "none"}`, scrollbarGutter: 'stable both-edges' }} className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">

            <div>
                <div className="flex justify-between items-center">
                    <Link to="/" onClick={() => { }} className="items-center text-2xl gap-3 ml-3 mt-4 flex font-extrabold tracking-tight dark:text-white text-slate-900">
                        <img src={mtgHubLogo} alt="new capenna symbol" className="w-11" /> <span className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-rose-800 to-orange-600">MTG HUB</span>
                    </Link>
                    <TooltipComponent content="Menu" position="BottomCenter">
                        <button type="button" className="text-2xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden" onClick={() => setActiveMenu(false)}>
                            <MdOutlineCancel />
                        </button>
                    </TooltipComponent>
                </div>
                <div className="mt-10">
                    <div>
                        <p className="text-gray-400 m-3 mt-4 uppercase">Navigation</p>
                        <div>
                            <NavLink to={`/home`} onClick={() => { }} className={({ isActive }) => isActive ? activeLink : normalLink}>
                                <BiHomeAlt />
                                <span className="w-xs">Home</span>
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 m-3 mt-4 uppercase">Scryfall</p>
                        <div>
                            <NavLink to={`/#`} onClick={() => { }} className={({ isActive }) => isActive ? activeLink : normalLink}>
                                <FiLogIn />
                                <span className="w-xs">Login</span>
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 m-3 mt-4 uppercase">Apps</p>
                        <div>
                            <NavLink to={`/open-packs`} onClick={() => { }} className={({ isActive }) => isActive ? activeLink : normalLink}>
                                <GiCardRandom />
                                <span className="w-xs">Booster Pack Simulator</span>
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 m-3 mt-4 uppercase">Cards</p>
                        <div>
                            <NavLink to={`/cards/all`} onClick={() => { }} className={({ isActive }) => isActive ? activeLink : normalLink}>
                                <BsFillGrid3X3GapFill />
                                <span className="w-xs">All</span>
                            </NavLink>
                            <NavLink to={`/cards/random`} onClick={() => { }} className={({ isActive }) => isActive ? activeLink : normalLink}>
                                <GiPerspectiveDiceSixFacesRandom />
                                <span className="w-xs">Random</span>
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 m-3 mt-4 uppercase">Sets</p>
                        <div>
                            {!sets.length > 0 && <SkeletonTheme baseColor={currentMode === 'Dark' ? "#242424" : ""} highlightColor={currentMode === 'Dark' ? "#33373E" : ""}><Skeleton className="m-3 mb-5" count={20} /></SkeletonTheme>}
                            {sets?.slice(0, visible)?.map(set => (
                                <div key={set.id}>
                                    <NavLink to={`/sets/${set.id}`} key={set.id} onClick={() => { }} className={({ isActive }) => isActive ? activeLink : normalLink}>
                                        <svg style={{ background: `${currentMode === 'Dark' ? '#ffffff' : '#000000'}`, mask: `url(${set.icon_svg_uri}) no-repeat center` }} xmlns={set.icon_svg_uri} alt="set symbol" className="w-4 object-contain max-h-4" />
                                        <span className="w-xs">{set.name}</span>
                                    </NavLink>

                                    {set?.children?.map(child => (
                                        <NavLink to={`/sets/${child.id}`} key={child.id} onClick={() => { }} className={({ isActive }) => isActive ? activeLink : normalLink} style={{ marginLeft: '1.5rem' }}>
                                            <svg style={{ background: `${currentMode === 'Dark' ? '#ffffff' : '#000000'}`, mask: `url(${child.icon_svg_uri}) no-repeat center` }} xmlns={child.icon_svg_uri} alt="set symbol" className="w-4 object-contain max-h-4" />
                                            <span className="w-xs">{child.name}</span>
                                        </NavLink>
                                    ))}
                                </div>

                            ))}
                        </div>
                        <div className="flex justify-center align-center mt-10">
                            {(sets?.length > 0) && !(visible >= sets?.length) && <div ref={loadMoreRef} className="text-center inline mr-5" onClick={loadMoreSets}><ProgressButtonComponent spinSettings={{ position: 'right' }} content='Load More Sets' /></div>}
                            {sidebarRef?.current?.scrollHeight > 2340 && <div onClick={() => sidebarRef?.current?.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })} ref={toTopRef} className="inline"><ButtonComponent>To top</ButtonComponent></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Sidebar