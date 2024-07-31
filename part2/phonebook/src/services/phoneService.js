import axios from 'axios'

const baseUrl = '/api/persons'

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
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

export default {create, getAll, update, remove}