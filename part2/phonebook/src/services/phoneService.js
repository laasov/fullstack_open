import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

// CRUD

const create = data => {
    return axios.post(baseUrl, data)
}

const getAll = () => {
    return axios.get(baseUrl)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {create, getAll, update, remove}