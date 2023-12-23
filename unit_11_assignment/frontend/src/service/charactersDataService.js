/*Alvee Jalal
11/19/2023
IT 302001
Unit 11 Assignment 
ahj24@njit.edu*/
import axios from "axios"

class CharacterDataService{

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters?page=${page}`)
    }

    get(id)
    {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters/id/${id}`)
    }

    find(query, by="title", page=0)
    {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters?${by}=${query}&page=${page}`)
    }
    find(query, by="firstName", page=0)
    {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters?${by}=${query}&page=${page}`)
    }
    find(query, by="lastName", page=0)
    {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters?${by}=${query}&page=${page}`)
    }
    find(query, by="fullName", page=0)
    {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters?${by}=${query}&page=${page}`)
    }

    createImpression(data)
    {
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters/impressions`,data)
    }

    updateImpression(data)
    {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters/impressions`,data)
    }

    deleteImpression(id, userId)
    {
        return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters/impressions`,
        { data: { impression_id: id, user_id: userId} })
    }

    getFamilies(){
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ahj24/characters/families`)
    }

}

export default new CharacterDataService();