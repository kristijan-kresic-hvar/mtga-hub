import React, { useState, useEffect } from 'react';
// tslint:disable:max-line-length
import { useStateContext } from '../contexts/ContextProvider';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import 'react-loading-skeleton/dist/skeleton.css'
import Card from '../components/Card'
import { useParams } from 'react-router-dom'
import { getAllCards, getAllCardsInSet, getSingleSet } from '../api'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const CardList = () => {

    const { setLoading, loading, currentMode } = useStateContext()

    const { setId } = useParams()

    const [cards, setCards] = useState([])
    const [totalCards, setTotalCards] = useState()
    const [resultsPerPage, setResultsPerPage] = useState(50)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageInputValue, setCurrentPageInputValue] = useState(1)
    const [noData, setNoData] = useState(false)
    const [cardPreloadersCount] = useState([...Array(100)])
    const [currentSetId, setCurrentSetId] = useState()
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const firstPage = () => {
        setCurrentPage(1)
    }

    const lastPage = () => {
        setCurrentPage(Math.ceil(totalCards / resultsPerPage))
    }

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }

    const previousPage = () => {
        setCurrentPage(prevPage => prevPage - 1)
    }

    const handleWindowResize = () => {
        setWindowSize(window.innerWidth)
    }

    const handlePageInputChange = (e) => {
        if (!e.target.value || Number(e.target.value) > (Math.ceil(totalCards / resultsPerPage)) || Number(e.target.value) <= 0) return false
        setCurrentPageInputValue(Number(e.target.value))

        setTimeout(() => {
            setCurrentPage(Number(e.target.value))
        }, 1500)
    }

    useEffect(() => {
        setCards([])
        setNoData(false)

        currentSetId === setId ? currentPage : setCurrentPage(1)

        setTimeout(() => {

            if (!setId) {
                setResultsPerPage(50)
                getAllCards(currentPage, resultsPerPage)
                    .then(data => {

                        if (!data) {
                            setLoading(false)
                            return setNoData(true)
                        }

                        setCards(data?.cards)
                        setTotalCards(data?.total)
                    })
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
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

                                    setCards(data?.data)
                                    setTotalCards(data?.total_cards)
                                })
                        }
                    })
                    .catch(error => console.log(error.message))

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }
        }, 2500)
    }, [currentPage, setId])

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
                {cards?.length > 0 && cards?.map((card, index) => (
                    <Card key={index} cardValues={card} />
                ))}
                {!cards?.length > 0 && !loading && noData && <h3 className="dark:text-white">Nothing to show...</h3>}
            </div>
            {
                cards?.length > 0 && !loading &&
                <div className="text-center mt-10">
                    {windowSize > 810 &&
                        <div>
                            <ButtonComponent disabled={currentPage === 1} cssClass={`${currentMode === 'Dark' ? 'e-warning' : 'e-info'} e-normal mr-10`} onClick={firstPage}>First</ButtonComponent>
                            <ButtonComponent disabled={currentPage === 1} cssClass={`${currentMode === 'Dark' ? 'e-warning' : 'e-info'} e-large`} onClick={previousPage}>Previous Page</ButtonComponent>
                            <span className="ml-5 mr-5 dark:text-white">Page <input onChange={handlePageInputChange} className="w-20 ml-3 text-black" type="number" value={currentPageInputValue} /> of {totalCards && (Math.ceil(totalCards / resultsPerPage))}</span>
                            <ButtonComponent disabled={currentPage === (Math.ceil(totalCards / resultsPerPage))} cssClass={`${currentMode === 'Dark' ? 'e-warning' : 'e-info'} e-large`} onClick={nextPage}>Next Page</ButtonComponent>
                            <ButtonComponent disabled={currentPage === (Math.ceil(totalCards / resultsPerPage))} cssClass={`${currentMode === 'Dark' ? 'e-warning' : 'e-info'} e-normal ml-10`} onClick={lastPage}>Last</ButtonComponent>
                        </div>
                    }

                    {windowSize < 810 &&
                        <div style={{ maxWidth: '400px' }} className="flex ml-auto mr-auto items-center justify-center">
                            <div className="flex flex-col justify-center ml-2">
                                <div>
                                    <ButtonComponent disabled={currentPage === 1} cssClass={`${currentMode === 'Dark' ? 'e-warning' : 'e-info'} e-large`} onClick={previousPage}>{window.innerWidth < 810 ? 'Previous' : 'Previous Page'}</ButtonComponent>
                                </div>
                                <div>
                                    <ButtonComponent disabled={currentPage === 1} cssClass={`${currentMode === 'Dark' ? 'e-warning' : 'e-info'} e-normal mt-3`} onClick={firstPage}>First</ButtonComponent>
                                </div>
                            </div>

                            <div className="dark:text-white inline-block text-center ml-auto mr-auto">
                                <div className="mb-2">
                                    <small>Page </small>
                                </div>
                                <div>
                                    <input onChange={handlePageInputChange} className="w-20 ml-3 text-black" type="number" value={currentPageInputValue} />
                                </div>
                                <div className="mt-2">
                                    <span>of</span> {totalCards && (Math.ceil(totalCards / resultsPerPage))}
                                </div>
                            </div>

                            <div className="ml-auto mr-2 flex items-center justify-center">
                                <div className="flex flex-col justify-center">
                                    <div>
                                        <ButtonComponent disabled={currentPage === (Math.ceil(totalCards / resultsPerPage))} cssClass={`${currentMode === 'Dark' ? 'e-warning' : 'e-info'} e-large`} onClick={nextPage}>{window.innerWidth < 810 ? 'Next' : 'Next Page'}</ButtonComponent>
                                    </div>
                                    <div>
                                        <ButtonComponent disabled={currentPage === (Math.ceil(totalCards / resultsPerPage))} cssClass={`${currentMode === 'Dark' ? 'e-warning' : 'e-info'} e-normal mt-3`} onClick={lastPage}>Last</ButtonComponent>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                </div>
            }
        </div >

    );
}

export default CardList