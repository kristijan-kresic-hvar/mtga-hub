import React, { useState, useEffect, useRef, useCallback } from 'react';
// tslint:disable:max-line-length
import { useStateContext } from '../contexts/ContextProvider';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import 'react-loading-skeleton/dist/skeleton.css'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'
import { getAllCards, getAllCardsInSet, getSingleSet } from '../api'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

const CardList = () => {

    const { setLoading, loading, currentMode } = useStateContext()

    const { setId } = useParams()

    const location = useNavigate()

    const [cards, setCards] = useState([])
    const [totalCards, setTotalCards] = useState()
    const [resultsPerPage, setResultsPerPage] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [noData, setNoData] = useState(false)
    const [cardPreloadersCount] = useState([...Array(100)])
    const [currentSetId, setCurrentSetId] = useState("all")
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [hasMore, setHasMore] = useState(false)

    const observer = useRef()
    const lastCardElementRef = useCallback(node => {
        if (loading || !cards.length > 0) return
        if (observer?.current) observer?.current?.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (!loading && cards?.length > 0 && entries[0].isIntersecting && (hasMore || !(currentPage >= (Math.ceil(totalCards / resultsPerPage))))) {
                if (hasMore || !(currentPage >= (Math.ceil(totalCards / resultsPerPage)))) {
                    setCurrentPage(prevPage => prevPage + 1)
                }

                return false
            }
        })

        if (node && cards?.length > 0) observer.current.observe(node)

        console.log(node)
    }, [cards, loading, hasMore])

    const handleWindowResize = () => {
        setWindowSize(window.innerWidth)
    }

    useEffect(() => {
        setNoData(false)
        setLoading(true)

        setTimeout(() => {
            if (!setId) {

                setResultsPerPage(50)
                setCurrentSetId("all")

                return getAllCards(currentSetId === "all" ? currentPage : 1, resultsPerPage)
                    .then(data => {
                        if (!data) {
                            setLoading(false)
                            return setNoData(true)
                        }

                        if (currentPage === 1) {
                            setCards(data?.cards)
                            setTotalCards(data?.total)
                            setLoading(false)
                        } else {
                            setCards(prevCards => [...prevCards, ...data?.cards])
                            setTotalCards(data?.total)
                            setLoading(false)
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                setResultsPerPage(175)
                setCurrentSetId(setId)

                getSingleSet(setId)
                    .then(data => {
                        if (data) {
                            getAllCardsInSet(data?.search_uri, currentSetId === setId ? currentPage : 1)
                                .then(data => {
                                    if (!data) {
                                        setLoading(false)
                                        return setNoData(true)
                                    }

                                    if (currentPage === 1) {
                                        setCards(data?.data)
                                        setHasMore(data?.has_more)
                                        setTotalCards(data?.total_cards)

                                        setLoading(false)
                                    } else {
                                        setCards(prevCards => [...prevCards, ...data?.data])
                                        setHasMore(data?.has_more)
                                        setTotalCards(data?.total_cards)

                                        setLoading(false)
                                    }
                                })
                        }
                    })
                    .catch(error => console.log(error.message))
            }
        }, 2500)
    }, [currentPage, setId])

    useEffect(() => {
        if ((currentSetId !== setId)) {
            window.scrollTo(0, 0)
            setCurrentPage(1)
            setCards([])
        }
    }, [setId])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)

        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    return (
        <div className="mt-20 mb-4">
            <div className="ml-4 mr-4 allcardsgrid h-full grid grid-cols-2 gap-4 md:gap-8 xs:ml-40 md:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 lg:ml-0 place-items-center">
                {!cards?.length > 0 && noData === false &&
                    cardPreloadersCount?.map((_, index) => (
                        <div key={index} className="w-4/5" >
                            <SkeletonTheme baseColor={currentMode === 'Dark' ? "#33373E" : ""} highlightColor={currentMode === 'Dark' ? "#242424" : ""}>
                                <Skeleton style={{ borderRadius: '.8rem', pointerEvents: 'none !important', height: '25vw', maxHeight: '350px', minHeight: '200px' }} />
                            </SkeletonTheme>
                        </div>
                    ))
                }
                {cards?.length > 0 && cards?.map((card, index) => {
                    if (cards?.length === index + 1) {
                        return <Card key={index} ref={lastCardElementRef} cardValues={card} />
                    } else {
                        return <Card key={index} cardValues={card} />
                    }
                })}
                {!cards?.length > 0 && !loading && noData && <h3 className="dark:text-white">Nothing to show...</h3>}
            </div>
        </div >
    );
}

export default CardList