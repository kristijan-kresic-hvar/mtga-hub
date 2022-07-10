import axios from 'axios'

// Get all sets
export const getAllSets = () => {
    if (!process.env.REACT_APP_GET_ALL_SETS) return false

    return axios.get(process.env.REACT_APP_GET_ALL_SETS)
        .then(response => response.data)
        .catch(error => console.log(error.message))
}

// Get all cards
export const getAllCards = (page = 1) => {
    if (!process.env.REACT_APP_GET_ALL_CARDS) return false

    return axios.get(`${process.env.REACT_APP_GET_ALL_CARDS}?page=${page}`)
        .then(response => {
            response.data.total = response?.headers["total-count"]
            return response?.data
        })
        .catch(error => console.log(error.message))
}

// Get all cards in specified set
export const getAllCardsInSet = (url, page = 1) => {
    if (!url) return false

    return axios.get(`${url}&page=${page}`)
        .then(response => {

            console.log(response)

            if (!response) return []

            if (response) {
                response.data.total = response?.data?.data?.total_cards
                return response?.data || null
            }

        })
        .catch(error => console.log(error.message))
}

// Get one set
export const getSingleSet = (id) => {
    if (!process.env.REACT_APP_GET_SINGLE_SET || !id) return false

    return axios.get(`${process.env.REACT_APP_GET_SINGLE_SET}/${id}`)
        .then(response => {
            return response?.data
        })
        .catch(error => console.log(error.message))
}